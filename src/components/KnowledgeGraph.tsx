"use client";

import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { forceCollide } from "d3-force";
import { buildGraphData, type GraphNode, type GraphLink } from "@/lib/graph-data";

// Lazy-import ForceGraph2D at module level (only runs client-side)
import ForceGraph2D from "react-force-graph-2d";

interface KnowledgeGraphProps {
  width: number;
  height: number;
  interactive?: boolean;
  onNodeClick?: (slug: string) => void;
  highlightEra?: string | null;
  highlightCategory?: string | null;
  searchQuery?: string;
}

// Extend the node type with force-graph internal coords
type FGNode = GraphNode & { x?: number; y?: number };
type FGLink = GraphLink & { source: FGNode | string; target: FGNode | string };

export default function KnowledgeGraph({
  width,
  height,
  interactive = true,
  onNodeClick,
  highlightEra,
  highlightCategory,
  searchQuery,
}: KnowledgeGraphProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(undefined);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [neighborSet, setNeighborSet] = useState<Set<string>>(new Set());

  const graphData = useMemo(() => buildGraphData(), []);

  // Build adjacency map for hover highlighting
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const link of graphData.links) {
      const s = typeof link.source === "string" ? link.source : (link.source as FGNode).id;
      const t = typeof link.target === "string" ? link.target : (link.target as FGNode).id;
      if (!map.has(s)) map.set(s, new Set());
      if (!map.has(t)) map.set(t, new Set());
      map.get(s)!.add(t);
      map.get(t)!.add(s);
    }
    return map;
  }, [graphData.links]);

  // Search matching node IDs
  const searchMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return null;
    const q = searchQuery.toLowerCase();
    const matches = new Set<string>();
    for (const node of graphData.nodes) {
      if (
        node.title.toLowerCase().includes(q) ||
        node.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        matches.add(node.id);
      }
    }
    return matches;
  }, [searchQuery, graphData.nodes]);

  // Configure forces after mount
  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const charge = fg.d3Force("charge") as any;
    if (charge?.strength) charge.strength(-120);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const link = fg.d3Force("link") as any;
    if (link?.distance) {
      link.distance((l: FGLink) => {
        const w = typeof l.weight === "number" ? l.weight : 3;
        return Math.max(30, 120 - w * 8);
      });
    }

    // Collision force
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fg.d3Force("collision", forceCollide<FGNode>((node) => Math.sqrt(node.val) * 4 + 2) as any);

    // Auto-fit after warmup
    setTimeout(() => {
      fg.zoomToFit(400, 40);
    }, 500);
  }, []);

  const getNodeAlpha = useCallback(
    (node: FGNode): number => {
      // Search highlight
      if (searchMatches) {
        return searchMatches.has(node.id) ? 1 : 0.08;
      }
      // Era/category highlight
      if (highlightEra && node.era !== highlightEra) return 0.08;
      if (highlightCategory && node.category !== highlightCategory) return 0.08;
      // Hover highlight
      if (hoveredNode) {
        if (node.id === hoveredNode || neighborSet.has(node.id)) return 1;
        return 0.15;
      }
      return 1;
    },
    [hoveredNode, neighborSet, highlightEra, highlightCategory, searchMatches]
  );

  const nodeCanvasObject = useCallback(
    (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const radius = Math.sqrt(node.val) * 3;
      const alpha = getNodeAlpha(node);
      const color = node.eraColor;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(x, y, radius, x, y, radius * 2.5);
      glowGrad.addColorStop(0, color + "40");
      glowGrad.addColorStop(1, color + "00");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Main circle with radial gradient
      const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
      grad.addColorStop(0, color + "ff");
      grad.addColorStop(1, color + "99");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Label: show for high-impact, hovered, or search-matched nodes
      const showLabel =
        (!interactive && node.impactLevel >= 5) ||
        node.id === hoveredNode ||
        (searchMatches?.has(node.id)) ||
        (interactive && node.impactLevel >= 4 && globalScale > 0.8) ||
        globalScale > 2;

      if (showLabel) {
        const fontSize = Math.max(10 / globalScale, 2.5);
        ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const label = node.title.length > 28 ? node.title.slice(0, 26) + "…" : node.title;
        const textWidth = ctx.measureText(label).width;

        // Background pill
        const pad = fontSize * 0.3;
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        const rx = textWidth / 2 + pad;
        const ry = fontSize / 2 + pad;
        const ty = y + radius + fontSize * 0.4;
        ctx.beginPath();
        ctx.roundRect(x - rx, ty - pad, rx * 2, ry * 2, fontSize * 0.2);
        ctx.fill();

        // Label text
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(label, x, ty);
      }

      ctx.restore();
    },
    [getNodeAlpha, hoveredNode, searchMatches, interactive]
  );

  const nodePointerAreaPaint = useCallback(
    (node: FGNode, color: string, ctx: CanvasRenderingContext2D) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const radius = Math.sqrt(node.val) * 3 + 4; // slightly larger hit area
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    },
    []
  );

  const handleNodeHover = useCallback(
    (node: FGNode | null) => {
      if (!node) {
        setHoveredNode(null);
        setNeighborSet(new Set());
        return;
      }
      setHoveredNode(node.id);
      setNeighborSet(adjacency.get(node.id) ?? new Set());
    },
    [adjacency]
  );

  const handleNodeClick = useCallback(
    (node: FGNode) => {
      if (onNodeClick) onNodeClick(node.id);
    },
    [onNodeClick]
  );

  const linkColor = useCallback(
    (link: FGLink) => {
      const s = typeof link.source === "string" ? link.source : (link.source as FGNode).id;
      const t = typeof link.target === "string" ? link.target : (link.target as FGNode).id;

      if (searchMatches) {
        if (searchMatches.has(s) && searchMatches.has(t)) return "rgba(99, 102, 241, 0.4)";
        return "rgba(99, 102, 241, 0.04)";
      }
      if (hoveredNode) {
        if (s === hoveredNode || t === hoveredNode) return "rgba(99, 102, 241, 0.5)";
        return "rgba(99, 102, 241, 0.05)";
      }
      if (highlightEra) {
        const sNode = graphData.nodes.find((n) => n.id === s);
        const tNode = graphData.nodes.find((n) => n.id === t);
        if (sNode?.era === highlightEra && tNode?.era === highlightEra) return "rgba(99, 102, 241, 0.3)";
        return "rgba(99, 102, 241, 0.04)";
      }
      if (highlightCategory) {
        const sNode = graphData.nodes.find((n) => n.id === s);
        const tNode = graphData.nodes.find((n) => n.id === t);
        if (sNode?.category === highlightCategory && tNode?.category === highlightCategory) return "rgba(99, 102, 241, 0.3)";
        return "rgba(99, 102, 241, 0.04)";
      }
      return "rgba(99, 102, 241, 0.12)";
    },
    [hoveredNode, highlightEra, highlightCategory, searchMatches, graphData.nodes]
  );

  const linkWidth = useCallback(
    (link: FGLink) => {
      const w = typeof link.weight === "number" ? link.weight : 3;
      const s = typeof link.source === "string" ? link.source : (link.source as FGNode).id;
      const t = typeof link.target === "string" ? link.target : (link.target as FGNode).id;
      if (hoveredNode && (s === hoveredNode || t === hoveredNode)) {
        return Math.max(1.5, w * 0.4);
      }
      return Math.max(0.3, w * 0.2);
    },
    [hoveredNode]
  );

  return (
    <ForceGraph2D
      ref={graphRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      graphData={graphData as any}
      width={width}
      height={height}
      backgroundColor="rgba(0,0,0,0)"
      nodeCanvasObject={nodeCanvasObject}
      nodeCanvasObjectMode={() => "replace"}
      nodePointerAreaPaint={nodePointerAreaPaint}
      linkColor={linkColor}
      linkWidth={linkWidth}
      onNodeHover={interactive ? handleNodeHover : undefined}
      onNodeClick={interactive ? handleNodeClick : undefined}
      enableNodeDrag={interactive}
      enableZoomInteraction={interactive}
      enablePanInteraction={interactive}
      enablePointerInteraction={interactive}
      warmupTicks={100}
      cooldownTicks={interactive ? 200 : 50}
      minZoom={0.5}
      maxZoom={8}
    />
  );
}

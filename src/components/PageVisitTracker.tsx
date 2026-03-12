"use client";

import { useEffect } from "react";
import {
  trackExploreGraphVisit,
  trackMilestonePageView,
} from "@/lib/analytics";

interface PageVisitTrackerProps {
  page: "explore" | "milestone";
  milestoneId?: string;
}

export default function PageVisitTracker({
  page,
  milestoneId,
}: PageVisitTrackerProps) {
  useEffect(() => {
    if (page === "explore") {
      trackExploreGraphVisit();
      return;
    }

    if (page === "milestone" && milestoneId) {
      trackMilestonePageView(milestoneId);
    }
  }, [page, milestoneId]);

  return null;
}

import { lazy } from "react";
import type { RouteItem } from "./types";

const AddPingPage = lazy(() => import("../../pages/AddPingPage"));

export const routes: RouteItem[] = [
  {
    name: "Add Test",
    path: "/",
    component: AddPingPage
  },
  {
    name: "View Report",
    path: "/view-report",
    component: AddPingPage
  },
];

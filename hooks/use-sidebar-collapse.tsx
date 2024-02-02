import { create } from "zustand";

interface SidebarToggle {
  isCollapsed: boolean;
  collapseSidebar: () => void;
}

export const useSideBarToggle = create<SidebarToggle>((set, get) => ({
  isCollapsed: false,
  collapseSidebar: () => set({ isCollapsed: !get().isCollapsed }),
}));

export interface SidebarNavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
  iconName?: string
  items?: SidebarNavItem[]
}

export interface DocsConfig {
  mainNav?: SidebarNavItem[]
  sidebarNav?: SidebarNavItem[]
}

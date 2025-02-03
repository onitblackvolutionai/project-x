export type Role = "admin" | "editor" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

const permissions = {
  admin: ["manage_team", "edit_settings", "view_analytics", "manage_campaigns"],
  editor: ["view_analytics", "manage_campaigns"],
  viewer: ["view_analytics"],
}

export function hasPermission(user: User, permission: string): boolean {
  if (!user || !user.role) return false
  return permissions[user.role].includes(permission)
}


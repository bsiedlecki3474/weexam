export interface User {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  role: string,
  is_active: number,
  created_on: string,
}

export interface SimpleUser {
  id: number,
  first_name: string,
  last_name: string,
}
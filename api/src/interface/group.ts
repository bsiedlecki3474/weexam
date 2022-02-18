export interface Group {
  id: number,
  name: string,
  members: number,
  is_active: number,
  created_on: string,
}

export interface SimpleGroup {
  id: number,
  name: string
}
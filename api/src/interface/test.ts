export interface Test {
  id: number,
  name: string,
  group_name: string,
  show_scores: number,
  is_active: number,
  created_on: string
}

export interface Event {
  id: number,
  test_id: number,
  start_date: string,
  end_date: string,
  duration: string,
  is_active: number
}

export interface TestEvent {
  id: number,
  assessment_id: number | null,
  name: string,
  start_date: string,
  end_date: string,
  duration: string,
  first_name: string,
  last_name: string,
  is_active: number
}
export interface Assessment {
  id: number,
  first_name: string,
  last_name: string,
  start_date: string,
  user_finished: number,
  count_total: number,
  count_correct: number
}

export interface AssessmentReport {
  id: number,
  content: string,
  user_answer: string,
  correct_answer: string,
  count_total: number,
  count_correct: number
}
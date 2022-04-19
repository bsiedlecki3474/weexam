export interface AnswerType {
  id: number,
  name: string
}

export interface Question {
  id: number,
  test_id: number,
  answer_type_id: number,
  content: string,
  answers: any
}

export interface Answer {
  id: number,
  value: number,
  checked: boolean,
  edit: boolean
}
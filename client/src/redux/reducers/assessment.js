import {
	CLEAR_ASSESSMENT,
	CLEAR_CHANGED_QUESTIONS,
	SET_QUESTION,
	START_ASSESSMENT_SUCCESS,
	SUBMIT_ASSESSMENT_SUCCESS,

	TOGGLE_ANSWER,
	FLAG_QUESTION,
	SET_ANSWERED
} from '../types/assessment'

const initialState = {
	error: null,
	changedQuestions: [],
	answers: [],
	flagged: [],
	answered: [],
	questionIndex: 0
};

const assessment = (state = initialState, action) => {
  switch (action.type) {
		case CLEAR_ASSESSMENT:
			return {...initialState };
		case START_ASSESSMENT_SUCCESS:
			return {...state, assessmentStarted: true };
		case SUBMIT_ASSESSMENT_SUCCESS:
			return {...state, assessmentStarted: false };
		case CLEAR_CHANGED_QUESTIONS:
			return {...state, changedQuestions: [] }
		case SET_QUESTION:
			return { ...state, questionIndex: action.payload }

		case TOGGLE_ANSWER: {
			const { questionId, answerId, answerTypeId } = action.payload;
			const answers = state.answers ?? {};

			switch (answerTypeId) {
				case 1: return answers[questionId]?.includes(answerId)
					? {...state }
					: {
							...state,
							changedQuestions: [...new Set([...state?.changedQuestions ?? [], questionId])],
							answers: {...state.answers, [questionId]: [answerId] }
						}
				case 2: return answers[questionId]?.includes(answerId)
					? {
							...state,
							changedQuestions: [...new Set([...state?.changedQuestions ?? [], questionId])],
							answers: {
								...state.answers,
								[questionId]: (state.answers[questionId] ?? []).filter(el => el != answerId) ?? []
							}
						}
					: {
							...state,
							changedQuestions: [...new Set([...state?.changedQuestions ?? [], questionId])],
							answers: {
								...state.answers,
								[questionId]: [...state.answers[questionId] ?? [], answerId]
							}
						}
			}
		}
		case FLAG_QUESTION: {
			const flagged = state.flagged ?? [];
			const questionIndex = action.payload;
			return flagged.includes(questionIndex)
				? {...state, flagged: flagged.filter(el => el != questionIndex) }
				: {...state, flagged: [...flagged, questionIndex] }	 
		}

		case SET_ANSWERED: {
			const answered = state.answered ?? [];
			const questionIndex = action.payload;
			return answered.includes(questionIndex)
				? {...state }
				: {...state, answered: [...answered, questionIndex] }	 
		}

		default:
			return state
	}
}

export default assessment;
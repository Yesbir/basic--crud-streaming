import { SIGN_OUT, SIGN_IN, GET_USER_INFO } from '../actions/types';

const INITIAL_STATE = { isSignedIn: null, userId: null, currentUser: null };

export const authState = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload.userId };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null, currentUser: null };
		case GET_USER_INFO:
			return { ...state, currentUser: action.payload };
		default:
			return state;
	}
	// if (action.type === 'SIGN_IN') return { ...state, isSignedIn: true };
	// else return { ...state, isSignedIn: false };
};

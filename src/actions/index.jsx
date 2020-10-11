import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
	DELETE_STREAM,
	GET_USER_INFO
} from './types';
import streams from '../apis/api';
import history from '../history';

export const trySignOut = () => {
	return {
		type: SIGN_OUT
	};
};

export const trySignIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: {
			userId: userId
		}
	};
};

export const getUserInfo = (userInfo) => {
	return {
		type: GET_USER_INFO,
		payload: userInfo
	};
};

export const createStream = (formValues) => {
	return async (dispatch, getState) => {
		const user = getState().authState.currentUser;
		const userId = user.userId;
		const author = user.name;
		const profilePicture = user.profilePicture;

		formValues = { ...formValues, userId, author, profilePicture };
		const response = await streams.post('/streams', formValues);

		dispatch({
			type: CREATE_STREAM,
			payload: response.data
		});
		history.push('/');
	};
};

export const fetchStreams = () => {
	return async (dispatch) => {
		const response = await streams.get('/streams');

		dispatch({
			type: FETCH_STREAMS,
			payload: response.data
		});
	};
};

export const fetchStream = (streamId) => {
	return async (dispatch) => {
		const response = await streams.get(`/streams/${streamId}`);

		dispatch({
			type: FETCH_STREAM,
			payload: response.data
		});
	};
};

export const deleteStream = (streamId) => {
	return async (dispatch) => {
		await streams.delete(`/streams/${streamId}`);

		dispatch({ type: DELETE_STREAM, payload: streamId });

		history.push('/');
	};
};

export const editStream = (streamId, formValues) => {
	return async (dispatch) => {
		const response = await streams.patch(`/streams/${streamId}`, formValues);

		dispatch({
			type: EDIT_STREAM,
			payload: response.data
		});
		history.push('/');
	};
};

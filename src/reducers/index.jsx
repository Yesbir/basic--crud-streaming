import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authState } from './authReducer';
import streams from './streamReducer';

export default combineReducers({
	authState: authState,
	form: formReducer,
	streams: streams
});

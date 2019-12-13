import apiReducer from './api';
import { combineReducers } from 'redux';
import videosReducer from "./video"
import channelsReducer from "./channel"
import commentsReducer from "./comment"
import searchReducer from './search';
export default combineReducers({
  api: apiReducer,
  videos: videosReducer,
  channels: channelsReducer,
  comments: commentsReducer,
  search: searchReducer
});
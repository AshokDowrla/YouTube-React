//watcher and worker sagas

import { take, fork,takeEvery,call,put,all } from "redux-saga/effects"
import * as videoActions from "../actions/video"
import { fetchEntity,ignoreErrors } from "./index";
import * as api from '../api/youtube-api';
import {REQUEST} from "../actions/index"



//watcher saga

export function* watchVideoCategories() {
    yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fetchVideoCategories);
  }


export function* watchMostPopularVideos() {

    while (true) {
        const { amount, loadDescription, nextPageToken } = yield take(videoActions.MOST_POPULAR[REQUEST]);

        yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
     


    }

}

export function* watchMostPopularVideosByCategory() {
    while(true) {
      const {categories} = yield take(videoActions.MOST_POPULAR_BY_CATEGORY[REQUEST]);
      yield fork(fetchMostPopularVideosByCategory, categories);
    }
  }

//worker saga
export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken){
 const request =()=>api.buildMostPopularVideosRequest(amount, loadDescription, nextPageToken)
 
 yield fetchEntity(request,videoActions.mostPopular)


}

export const fetchVideoCategories = ()=>fetchEntity(api.buildVideoCategoriesRequest,videoActions.categories)



export function* fetchMostPopularVideosByCategory(categories) {
    const requests = categories.map(category => {
      const wrapper = ignoreErrors(api.buildMostPopularVideosRequest, 10, false, null, category);
      return call(wrapper);
    });
    try {
      const response = yield all(requests);
      yield put(videoActions.mostPopularByCategory.success(response, categories));
    } catch (error) {
      console.log(error)
      yield put(videoActions.mostPopularByCategory.failure(error));
    }
  }
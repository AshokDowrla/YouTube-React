import { SUCCESS } from "../actions/index"

import { MOST_POPULAR, VIDEO_CATEGORIES, MOST_POPULAR_BY_CATEGORY } from "../actions/video"
import { VIDEO_LIST_RESPONSE, SEARCH_LIST_RESPONSE } from "../api/youtube-api-response-types"
import { createSelector } from 'reselect';
import { WATCH_DETAILS, VIDEO_DETAILS } from '../actions/watch';
import { getSearchParam } from "../../services/url/index"


const initialState = {
    byId: {},
    mostPopular: {},
    categories: {},
    byCategory: {},
    related: {},

}

const reduceRelatedVideosRequest = (responses) => {
    const relatedVideosResponse = responses.find(r => r.result.kind === SEARCH_LIST_RESPONSE);
    const { pageInfo, items, nextPageToken } = relatedVideosResponse.result;
    const relatedVideoIds = items.map(video => video.id);

    return {
        totalResults: pageInfo.totalResults,
        nextPageToken,
        items: relatedVideoIds
    };
}
const reducerFetchMostPopularVideos = (response, prevState) => {

    const videoMap = response.items.reduce((accumulator, video) => {
        accumulator[video.id] = video;
        return accumulator;
    }, {});

    let items = Object.keys(videoMap);

    if (response.hasOwnProperty('prevPageToken') && prevState.mostPopular) {
        items = [...prevState.mostPopular.items, ...items];
    }


    const mostPopular = {
        totalResults: response.pageInfo.totalResults,
        nextPageToken: response.nextPageToken,
        items,
    };
    return {
        ...prevState,
        mostPopular,
        byId: { ...prevState.byId, ...videoMap },
    };

}


const reduceFetchVideoCategories = (response, prevState) => {
    const categoryMapping = response.items.reduce((accumulator, category) => {
        accumulator[category.id] = category.snippet.title;
        return accumulator;
    }, {});

    return {
        ...prevState,
        categories: categoryMapping,
    };
}

const reduceFetchMostPopularVideosByCategory = (responses, categories, prevState) => {

        // console.log(categories)
        // console.log(responses)

    let videoMap = {};
    let byCategoryMap = {};

    responses.forEach((response, index) => {
        // ignore answer if there was an error
        if (response.status === 400) return;


        const categoryId = categories[index];

        const { byId, byCategory } = groupVideosByIdAndCategory(response.result);
        videoMap = { ...videoMap, ...byId };
        byCategoryMap[categoryId] = byCategory;

    })

    return {
        ...prevState,
        byId: { ...prevState.byId, ...videoMap },
        byCategory: { ...prevState.byCategory, ...byCategoryMap },
    };


}







const groupVideosByIdAndCategory = (response) => {

 // console.log(response)
    const videos = response.items;
    const byId = {};
    const byCategory = {
        totalResults: response.pageInfo.totalResults,
        nextPageToken: response.nextPageToken,
        items: [],
    };

    videos.forEach((video) => {
        byId[video.id] = video;

        const items = byCategory.items;
        if (items && items) {
            items.push(video.id);
        } else {
            byCategory.items = [video.id];
        }
    });

    return { byId, byCategory };
}



const reduceWatchDetails = (response, prevState) => {


    const videoDetailResponse = response.find(r => r.result.kind === VIDEO_LIST_RESPONSE);


    const video = videoDetailResponse.result.items[0];

    const relatedEntry = reduceRelatedVideosRequest(response);

    return {
        ...prevState,
        byId: {
            ...prevState.byId,
            [video.id]: video
        },
        related: {
            ...prevState.related,
            [video.id]: relatedEntry
        }
    };
}

const reduceVideoDetails = (responses, prevState) => {
    const videoResponses = responses.filter(response => response.result.kind === VIDEO_LIST_RESPONSE);
    const parsedVideos = videoResponses.reduce((videoMap, response) => {
        // we're explicitly asking for a video with a particular id
        // so the response set must either contain 0 items (if a video with the id does not exist)
        // or at most one item (i.e. the channel we've been asking for)
        const video = response.result.items ? response.result.items[0] : null;
        if (!video) {
            return videoMap;
        }
        videoMap[video.id] = video;
        return videoMap;
    }, {});

    //console.log(parsedVideos)

    return {
        ...prevState,
        byId: { ...prevState.byId, ...parsedVideos },
    };

}
/////////////////////////////////////////
const videos = (state = initialState, action) => {

    switch (action.type) {

        case MOST_POPULAR[SUCCESS]:
            return reducerFetchMostPopularVideos(action.response, state);
        case VIDEO_CATEGORIES[SUCCESS]:
            return reduceFetchVideoCategories(action.response, state);
        case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
            return reduceFetchMostPopularVideosByCategory(action.response, action.categories, state);
        case WATCH_DETAILS[SUCCESS]:
            return reduceWatchDetails(action.responses, state);
        case VIDEO_DETAILS[SUCCESS]:
            // console.log(action.response)
            return reduceVideoDetails(action.response, state);
        default:
            return state;
    }
}


export default videos



////selectors


export const getVideoCategoryIds = createSelector(
    state => state.videos.categories,
    (categories) => {
        return Object.keys(categories || {});
    }
);


export const getMostPopularVideos = createSelector(

    (state) => (state.videos.byId),
    (state) => (state.videos.mostPopular),
    (videosById, mostPopular) => {
        if (!mostPopular || !mostPopular.items) {
            return []
        }

        return mostPopular.items.map(Id => videosById[Id])
    }

)


export const getVideosByCategory = createSelector(
    state => state.videos.byCategory,
    state => state.videos.byId,
    state => state.videos.categories,
    (videosByCategory, videosById, categories) => {
        return Object.keys(videosByCategory || {}).reduce((accumulator, categoryId) => {
            const videoIds = videosByCategory[categoryId].items;
            const categoryTitle = categories[categoryId];
            accumulator[categoryTitle] = videoIds.map(videoId => videosById[videoId]);
            return accumulator;
        }, {});
    }
);


export const videoCategoriesLoaded = createSelector(
    state => state.videos.categories,
    (categories) => {
        return Object.keys(categories || {}).length !== 0;
    }
);

export const videosByCategoryLoaded = createSelector(
    state => state.videos.byCategory,
    (videosByCategory) => {
        return Object.keys(videosByCategory || {}).length;
    }
);


export const getVideoById = (state, videoId) => {
    return state.videos.byId[videoId];
};




const getRelatedVideoIds = (state, videoId) => {

    const related = state.videos.related[videoId];

    //console.log(related)
    return related ? related.items : [];
};


export const getRelatedVideos = createSelector(
    getRelatedVideoIds,
    state => state.videos.byId,
    (relatedVideoIds, videos) => {
        if (relatedVideoIds) {
            //console.log(relatedVideoIds)
            // filter kicks out null values we might have
            return relatedVideoIds.map(videoId => videos[videoId.videoId]).filter(video => video);
        }


        return [];
    });



export const getChannelId = (state, location, name) => {
    const videoId = getSearchParam(location, name);
    const video = state.videos.byId[videoId];
    if (video) {
        return video.snippet.channelId;
    }
    return null;
};


export const getAmountComments = createSelector(
    getVideoById,
    (video) => {
        if (video) {
            return video.statistics.commentCount;
        }
        return 0;
    });
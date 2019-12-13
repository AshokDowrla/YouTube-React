import React from 'react'
import Video from "../../../components/Video/Video"
import VideoMetadata from "../../../components/VideoMetadata/VideoMetadata"
import VideoInfoBox from "../../../components/VideoInfoBox/VideoInfoBox"
import Comments from "../../Comments/Comments"
import RelatedVideos from "../../../components/RelatedVideos/RelatedVideos";
import "./WatchContent.scss";
import { getVideoById, getRelatedVideos, getAmountComments } from '../../../store/reducers/video';
import { getCommentsForVideo } from "../../../store/reducers/comment"
import { connect } from "react-redux"

import { getChannel } from '../../../store/reducers/channel';
import InfiniteScroll  from '../../../components/InfiniteScroll/InfiniteScroll';


const WatchContent = (props) => {
    //console.log(props.relatedVideos)
    if (!props.videoId) {
        return <div />
    }

    const shouldShowLoader=() =>{
        return !props.nextPageToken;
      }
    return (
        <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={shouldShowLoader()}>
            <div className='watch-grid'>
                <Video className='video' id={props.videoId} />
                <VideoMetadata className='metadata' video={props.video} />
                <VideoInfoBox className='video-info-box' video={props.video} channel={props.channel} />
                <Comments className='comments' comments={props.comments} amountComments={props.amountComments} />
                <RelatedVideos className='related-videos' videos={props.relatedVideos} />
            </div>
        </InfiniteScroll>
    )
}


const mapStateToProps = (state, props) => {
    return {
        relatedVideos: getRelatedVideos(state, props.videoId),
        video: getVideoById(state, props.videoId),
        channel: getChannel(state, props.channelId),
        comments: getCommentsForVideo(state, props.videoId),
        amountComments: getAmountComments(state, props.videoId)

    }
}

export default connect(mapStateToProps, null)(WatchContent)
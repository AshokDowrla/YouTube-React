

import React from "react"

import * as watchActions from '../../store/actions/watch';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { connect } from "react-redux"
import WatchContent from "./WatchContent/WatchContent"
import { getSearchParam } from "../../services/url";
import { getChannelId } from "../../store/reducers/video";

import * as commentActions from '../../store/actions/comment';

import {getCommentNextPageToken} from "../../store/reducers/comment"

class Watch extends React.Component {

    getVideoId = () => {
        return getSearchParam(this.props.location, 'v')
    }


    fetchMoreComments = () => {
        if (this.props.nextPageToken) {
            this.props.fetchCommentThread(this.getVideoId(), this.props.nextPageToken);
        }
    };

    componentDidMount() {
        if (this.props.youtubeLibraryLoaded) {
            this.fetchWatchContent();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
            this.fetchWatchContent();
        }
    }

    fetchWatchContent = () => {


        const videoId = this.getVideoId();
        if (!videoId) {
            this.props.history.push('/');
        }
        this.props.fetchWatchDetails(videoId, this.props.channelId);
    }

    render() {
        const videoId = this.getVideoId();
        return (
            <WatchContent videoId={videoId} channelId={this.props.channelId} bottomReachedCallback={this.fetchMoreComments}/>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
        channelId: getChannelId(state, props.location, 'v'),
        nextPageToken: getCommentNextPageToken(state, props.location),
    };
}


const mapDispatchToProps = (dispatch) => {
    const fetchWatchDetails = watchActions.details.request;
    const fetchCommentThread = commentActions.thread.request;
    return bindActionCreators({ fetchWatchDetails,fetchCommentThread }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch))
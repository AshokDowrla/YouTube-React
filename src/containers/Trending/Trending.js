import React, { Component } from 'react'
import "./Trending.scss"
import SideBar from "../SideBar/SideBar"
import VideoPreview from "../../components/VideoPreview/VideoPreview"
import * as videoActions from "../../store/actions/video";
import { getMostPopularVideos } from '../../store/reducers/video';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Trending extends Component {


    componentDidMount() {
        this.fetchTrendingVideos();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
            this.fetchTrendingVideos();
        }
    }
    fetchTrendingVideos() {
        if (this.props.youtubeLibraryLoaded) {
            this.props.fetchMostPopularVideos(20, true);
        }
    }

    getVideoPreviews() {
        return this.props.videos.map(video => (
            <VideoPreview horizontal={true} expanded={true} video={video} key={video.id} pathname={'/watch'}
                search={'?v=' + video.id} />)
        );
    }
    render() {
        const previews = this.getVideoPreviews();
        return (
            <React.Component>

                <SideBar />
                <div className='trending'>
                    {previews}
                </div>

            </React.Component>

        )
    }
}


const mapStateToProps = (state) => {

    return {
        youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
        videos: getMostPopularVideos(state)

    }
}

const mapDispatchToProps = (dispatch) => {

    const fetchMostPopularVideos = videoActions.mostPopular.request;
    return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Trending)
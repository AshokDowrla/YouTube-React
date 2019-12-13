import React, { Component } from 'react'

import "./HomeContent.scss"
import VideoGrid from '../../../components/VideoGrid/VideoGrid'
import { connect } from 'react-redux';
import { getMostPopularVideos, getVideosByCategory } from "../../../store/reducers/video"
import InfiniteScroll from '../../../components/InfiniteScroll/InfiniteScroll';

const AMOUNT_TRENDING_VIDEOS = 10;

export class HomeContent extends Component {

    getVideoGridsForCategories = () => {

        const categoryTitles = Object.keys(this.props.videosByCategory || {});

        return categoryTitles.map((categoryTitle, index) => {
            const videos = this.props.videosByCategory[categoryTitle];

            const hideDivider = index === categoryTitles.length - 1;

            return <VideoGrid title={categoryTitle} videos={videos} key={categoryTitle} hideDivider={hideDivider} />;
        });


    }

    getTrendingVideos = () => {
        return this.props.mostPopularVideos.slice(0, AMOUNT_TRENDING_VIDEOS);
    }
    render() {
        const trendingVideos = this.getTrendingVideos();
        const categoryGrids = this.getVideoGridsForCategories();
        return (
            <React.Fragment>

                <div className="home-content">
                    <div className="responsive-video-grid-container">
                        <InfiniteScroll bottomReachedCallback ={this.props.bottomReachedCallback} showLoader={this.props.showLoader} >
                            <VideoGrid title='Trending' videos={trendingVideos} />
                            {categoryGrids}

                        </InfiniteScroll>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videosByCategory: getVideosByCategory(state),
        mostPopularVideos: getMostPopularVideos(state),
    };
}
export default connect(mapStateToProps, null)(HomeContent);

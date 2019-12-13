import React from 'react'
import "./VideoGrid.scss"
import VideoPreview from '../VideoPreview/VideoPreview'
import { Divider } from "semantic-ui-react"
import VideoGridHeader from './VideoGridHeader/VideoGridHeader'
const VideoGrid = (props) => {
    if (!props.videos || !props.videos.length) {
        return <div />;
    }


    const gridItems = props.videos.map(video => {
        return (<VideoPreview video={video}
            key={video.id} pathname='/watch' search={`?v=${video.id}`} />);
    });
    const divider = props.hideDivider ? null : <Divider />;
    return (
        <React.Fragment>
            <VideoGridHeader title={props.title} />
            <div className="video-grid">
                {gridItems}

            </div>
            {divider}

        </React.Fragment>
    )
}


export default VideoGrid
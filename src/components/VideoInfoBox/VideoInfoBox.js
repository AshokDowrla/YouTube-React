import React, { Component } from 'react'
import { Image, Button } from "semantic-ui-react"
import "./VideoInfoBox.scss"
import Linkify from 'react-linkify';
import {getShortNumberString} from "../../services/number/number-format"
import { getPublishedAtDateString } from '../../services/date/date-format';

class VideoInfoBox extends Component {
    state = {
        collapsed: true,
    }

    onShowMoreToggle = () => {

        this.setState((prevState) => {
            return {

                collapsed: !prevState.collapsed

            }
        })
    }

    getDescriptionParagraphs = () => {

        const videoDescription = this.props.video.snippet ? this.props.video.snippet.description : null;
        if (!videoDescription) {
            return null;
        }
        return videoDescription.split('\n').map((paragraph, index) => <p key={index}><Linkify>{paragraph}</Linkify></p>);
    }

    getConfig = () => {
        let descriptionTextClass = 'collapsed';
        let buttonTitle = 'Show More';
        if (!this.state.collapsed) {
            descriptionTextClass = 'expanded';
            buttonTitle = 'Show Less';
        }
        return {
            descriptionTextClass,
            buttonTitle
        };
    }


    getSubscriberButtonText = () => {
        const { channel } = this.props;
        const parsedSubscriberCount = Number(channel.statistics.subscriberCount);
        const subscriberCount = getShortNumberString(parsedSubscriberCount);
        return `Subscribe ${subscriberCount}`;
    }

    render() {

        if (!this.props.video || !this.props.channel) {
            return <div />;
        }

        const { channel } = this.props;
        const channelThumbnail = channel.snippet.thumbnails.medium.url;
        const channelTitle = channel.snippet.title;


        const buttonText = this.getSubscriberButtonText();

        const publishedAtString = getPublishedAtDateString(this.props.video.snippet.publishedAt);
        const descriptionParagraphs = this.getDescriptionParagraphs();
        const { descriptionTextClass, buttonTitle } = this.getConfig();
        return (
            <div className='video-info-box'>
                <Image className='channel-image' src={channelThumbnail} circular />



                <div className="video-info">
                    <div className='channel-name'>{channelTitle}</div>
                    <div className='video-publication-date'>{publishedAtString}</div>
                </div>

                <Button color='youtube'>{buttonText}</Button>

                <div className="video-description">
                    <div className={descriptionTextClass}>
                        {descriptionParagraphs}

                    </div>
                    <Button compact onClick={this.onShowMoreToggle}>{buttonTitle}</Button>
                </div>
            </div>


        )
    }
}


export default VideoInfoBox
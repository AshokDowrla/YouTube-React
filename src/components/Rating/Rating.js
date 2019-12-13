import React from 'react'
import "./Rating.scss"
import { Progress, Icon } from 'semantic-ui-react';
import { getShortNumberString } from '../../services/number/number-format';


const Rating = (props) => {
    let progress = null;

    let likeCount = props.likeCount !== 0 ? props.likeCount : null;
    let dislikeCount = null;


    if (props.likeCount && props.dislikeCount) {
        const amountLikes = parseFloat(props.likeCount);
        const amountDislikes = parseFloat(props.dislikeCount);

        const percent = 100.0 * (amountLikes / (amountLikes + amountDislikes));

        likeCount = getShortNumberString(amountLikes);
        dislikeCount = getShortNumberString(amountDislikes);

        progress = <Progress className="progress" percent={percent} size="tiny" />
    }
    return (
        <div className="rating">

            <div className="thumbs-up">
                <Icon name="thumbs up outline" />
                <span>{likeCount}</span>
            </div>

            <div className="thumbs-down">
                <Icon name="thumbs down outline" />
                <span>{dislikeCount}</span>
            </div>
            {progress}
        </div>
    )
}
export default Rating
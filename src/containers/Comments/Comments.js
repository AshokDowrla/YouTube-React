import React, { Component } from 'react'
import CommentHeader from './CommentHeader/CommentHeader'
import AddComment from "./AddComment/AddComment"
import Comment from "./Comment/Comment"
class Comments extends Component {
    render() {
        //console.log(this.props)
        if (!this.props.comments) {
            return <div />;
        }

        const comments = this.props.comments.map((comment) => {
            return <Comment comment={comment} key={comment.id} />
        });
        return (
            <div>
                <CommentHeader amountComments={this.props.amountComments} />
                <AddComment />
                {comments}
            </div>
        )
    }
}


export default Comments
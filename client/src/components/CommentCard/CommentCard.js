import React from "react";
import "./CommentCard.css";
import moment from 'moment';

const CommentCard = (props) => {
    return (
        <div className="card ccard flex-row justify-content-between my-3">
            <div className="card-header ccard-head">
                <p className="card-text text-muted text-center m-0">{props.username}</p>
                <p className="card-text text-muted text-center m-0">{moment(props.date).format("MMMM Do YYYY")}</p>
                <p className="card-text text-muted text-center m-0">{moment(props.date).format("HH:MM")}</p>
            </div>
            <div className="card-body d-flex">
                <p className="card-text">{props.comment}</p>
            </div>
        </div>
    )
};

export default CommentCard;



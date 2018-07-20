import React from "react";
import "./NewsCard.css";
import CommentCard from "../CommentCard";


const NewsCard = (props) => {
    if (!props.saved) {
        return (
            <div className="card flex-row flex-md-nowrap flex-wrap my-3">
                <div className="card-header">
                    <img className="card-img-top" src={props.image} alt={props.title} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <a href={props.link} target="_blank"> {props.title} </a>
                    </h5>
                    <p className="card-text text-muted">{props.author}</p>
                    <p className="card-text text-muted">{props.date}</p>
                    <p className="card-text">{props.body}</p>
                </div>
                <div className="card-footer">
                    {props.children}
                </div>
            </div>
        )
    } else {
        return (
            <div className="card flex-row flex-md-nowrap flex-wrap my-3">
                <div className="card-header flex-fill">
                    <img className="card-img-top" src={props.image} alt={props.title} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <a href={props.link} target="_blank"> {props.title} </a>
                    </h5>
                    <p className="card-text text-muted">{props.author}</p>
                    <p className="card-text text-muted">{props.date}</p>
                    <p className="card-text">{props.body}</p>
                    {
                        (props.comments.length > 0) ? (props.comments.map(e =>
                            <CommentCard
                                key={e._id}
                                username={e.userName}
                                date={e.date}
                                comment={e.comment}
                            />
                        )) : (<p className="text-muted"> No comments yet</p>)}
                </div>
                <div className="card-footer flex-fill">
                    {props.children}
                </div>
            </div>
        )
    }
};

export default NewsCard;
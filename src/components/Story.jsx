import React from "react";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function Story({
  _id,
  title,
  summary,
  image,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="story">
      <div className="image">
        <Link to={`/story/${_id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/story/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
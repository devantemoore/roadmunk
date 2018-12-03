import React  from 'react';
import {Link} from 'react-router-dom';
import PostImage from "../../assets/images/postImage.jpg";

const SinglePost = ({ id, title, author, content}) => {
   return(

    <div className={"card hoverable medium"}>
        <div className={"card-image"}>
            <img src={PostImage} alt={title}/>
                <Link to={`/${id}`} className={"card-title"}>
                    {title}
                </Link>
        </div>
        <div className="card-content">
            <p>
                {content.substr(0, 100)}
                {
                    content.length > 100 &&
                    <Link to={`/${id}`}> Read more</Link>
                }
            </p>
        </div>
        <div className="card-action">
            <div className="left card-footer-text">
                3 comments
            </div>
            <div className="right card-footer-text">
                {author}
            </div>
        </div>
    </div>

   );
};

export default SinglePost;

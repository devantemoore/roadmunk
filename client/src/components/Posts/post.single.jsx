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
                {content}
            </p>
        </div>
        <div className="card-action">
            <div class="left card-footer-text">
                3 comments
            </div>
            <div class="right card-footer-text">
                {author}
            </div>
        </div>
    </div>

   );
};

export default SinglePost;

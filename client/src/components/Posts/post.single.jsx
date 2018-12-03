import React  from 'react';
import {Link} from 'react-router-dom';
import PostImage from "../../assets/images/postImage.jpg";

const SinglePost = ({ id, title, author, content}) => {
   return(

    <div className={"card hoverable medium"}>
        <div className={"card-image"}>
            <img src={PostImage} alt={title}/>
                <Link to={`/${id}`} className={"card-title text-capitalize"}>
                    {title}
                </Link>
        </div>
        <div className="card-content">
            <p className={'text-capitalize-first'}>
                {content.substr(0, 100)}
                {
                    content.length > 100 &&
                    <Link to={`/${id}`}> Read more</Link>
                }
            </p>
        </div>
        <div className="card-action">
            <div className="card-footer-text blue-grey-text text-capitalize">
                Author: {author}
            </div>
        </div>
    </div>

   );
};

export default SinglePost;

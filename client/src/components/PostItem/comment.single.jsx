import React  from 'react';
import { appHelpers } from "../../_helpers";
const colors = ['blue-grey', 'red', 'green', 'blue', ''];
const SingleComment = ({ user, message, createdAt}) => {
    const colorIndex =  Math.floor((Math.random() * 3));
    return(
       <li className="collection-item avatar">
           <i className={`material-icons circle ${colors[colorIndex]}`}>person</i>
           <span className="title blue-grey-text">{user}</span>
           <p>
               {message}
           </p>
           <span className="secondary-content blue-grey-text">
               {appHelpers.formatDate(createdAt)}
           </span>
       </li>

   );
};

export default SingleComment;

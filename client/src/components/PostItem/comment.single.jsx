import React  from 'react';
import { appHelpers } from "../../_helpers";
const SingleComment = ({ user, message, createdAt}) => {
    return(
       <li className="collection-item avatar">
           <i className={`material-icons circle red`}>person</i>
           <span className="title blue-grey-text text-capitalize">{user}</span>
           <p className={'text-capitalize-first'}>
               {message}
           </p>
           <span className="secondary-content blue-grey-text">
               {appHelpers.formatDate(createdAt)}
           </span>
       </li>

   );
};

export default SingleComment;

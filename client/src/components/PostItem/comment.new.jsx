import React  from 'react';
import CommentSingle from "./comment.single";

const CommentPanel = ({ handleChange, comment, comments, handleSubmit}) => {
   return(

    <div>
        <div className="rows">
            <form onSubmit={handleSubmit}>
                <div className="input-field col s12">
                    <input
                        name={'comment'}
                        placeholder="Type your comment here" value={comment}
                           type="text"
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className={'col s12'}>
                <ul className="collection">
                    {
                        comments.map((item, key)=>{
                            return (
                                <CommentSingle
                                    key={key}
                                    user={item.user}
                                    message={item.message}
                                    createdAt={item.createdAt}
                                />
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    </div>

   );
};

export default CommentPanel;

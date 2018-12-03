import React  from 'react';
import CommentSingle from "./comment.single";

const CommentPanel = ({ handleChange, comment, comments}) => {
   return(

    <div>
        <div className="rosws">
            <div className="input-field col ss6">
                <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                {/*<label for="first_name">First Name</label>*/}
            </div>
            <div>
                {
                    comments.map((item, key)=>{
                        return (
                            <CommentSingle
                                key={key}
                            />
                        )
                    })
                }
            </div>

        </div>
    </div>

   );
};

export default CommentPanel;

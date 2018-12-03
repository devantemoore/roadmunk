import React  from 'react';
const PostPanel = ({ handleChange, comment, comments, handleSubmit}) => {
   return(
    <div>
        <div className="rows">
            <form onSubmit={handleSubmit}>
                <div className="input-field col s12">
                    <input
                        name={'comment'}
                        placeholder="Type your post here" value={comment}
                           type="text"
                        onChange={handleChange}
                    />
                </div>
            </form>

        </div>
    </div>

   );
};

export default PostPanel;

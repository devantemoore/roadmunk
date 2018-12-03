import React  from 'react';

const PostPanel = ({ requesting, title, description, handleChange, handleSubmit}) => {
   return(
    <div>
        <div className="rows">
            <form onSubmit={handleSubmit} >
                <div className={'col s12'}>
                    <h6>New Post</h6>
                </div>
                <div className="input-field col s12">
                    <input
                        name={'title'}
                        placeholder="Title" value={title}
                           type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field col s12">
                    <input
                        name={'description'}
                        placeholder="Description" value={description}
                           type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className={'col s12'}>
                    <button style={{marginBottom: '20px'}} className="waves-effect waves-light btn btn-small blue-grey darken-4"
                            disabled={requesting}
                            onClick={handleSubmit}>
                        <i className="material-icons left">add</i> Create Post
                    </button>
                </div>
            </form>
        </div>
    </div>

   );
};

export default PostPanel;

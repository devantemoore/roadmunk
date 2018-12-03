import React, { Component } from 'react';
import Layout from "../Layout";
import PostImage from "../../assets/images/postImage.jpg";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Make it Work!'
        }
    }

    render() {
        const { title, content } = this.state;
        return (
            <Layout>
                <div className={"card hoverable medium"}>
                    <div className={"card-image text-white"}>
                        <img src={PostImage} alt={title}/>
                        <span className={'card-title'}>
                            {title}
                        </span>
                    </div>
                    <div className="card-content">
                        <p>
                            {content}
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Post;

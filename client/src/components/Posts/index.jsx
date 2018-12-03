import React, { Component } from 'react';
import Layout from "../Layout";
import SinglePost from "./post.single";

class Posts extends Component {
    render() {
        return (
            <Layout>
                <SinglePost
                    id={1}
                    title={'New Post'}
                    author={'Moses Adebayo'}
                    content={'I love this pos'}
                />
                <SinglePost
                    id={1}
                    title={'New Post'}
                    author={'Moses Adebayo'}
                    content={'I love this pos'}
                />
            </Layout>
        );
    }
}

export default Posts;

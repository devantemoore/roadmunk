import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from "../Layout";
import { commonService } from "../../_services";
import { alertActions} from "../../_actions";
import { appConstants } from "../../_constants";
import { InlinePageRequesting } from "../../utils/PageUtility";
import SinglePost from "./post.single";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: false,
            currentPage: 1,
            nextPage: 1,
            endOfPage: false,
            limit: 10
        }
    }

    componentDidMount(){
        this.searchPosts();
    }

    searchPosts = (pageNumber) => {
        const { dispatch } = this.props;
        const { limit } = this.state;
        dispatch(alertActions.startRequest());

        let payload = {
            page: (pageNumber) ? pageNumber : 1,
            size: limit
        };
        commonService.searchPosts(payload)
            .then(res => {
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    const {posts, page} = res.response.data;
                   this.setState({
                       currentPage: page,
                       nextPage: (page + 1),
                       posts,
                       endOfPage: (posts.length === 0)
                   });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    };

    fetchMorePosts = () => {
        const { dispatch } = this.props;
        const { nextPage, limit } = this.state;
        dispatch(alertActions.startRequest());
        let payload = {
            page: nextPage,
            limit
        };
        commonService.searchPosts(payload)
            .then(res => {
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    const {posts, page} = res.response.data;
                    const currPosts = this.state.posts;
                    currPosts.push(...posts);
                   this.setState({
                       currentPage: page,
                       nextPage: (page + 1),
                       posts : currPosts,
                       endOfPage: (posts.length === 0)
                   });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    }

    render() {
        const { posts, endOfPage } = this.state;
        const { requesting } = this.props;
        return (
            <Layout>
                {
                    (!posts) && (requesting) &&
                        <InlinePageRequesting/>
                }
                {
                    (posts) && posts.map((item, key)=>{
                        return (
                            <SinglePost
                            key={key}
                            id={item.id}
                            title={item.title}
                            author={item.author}
                            content={item.description}
                        />
                        )
                    })
                }
                {
                    !endOfPage &&
                    <div style={{marginBottom: '20px'}}>
                        <button className="waves-effect waves-light btn btn-small blue-grey darken-4"
                                disabled={requesting}
                                onClick={() => this.fetchMorePosts()}>
                            <i className="material-icons left">cloud</i> Load more
                        </button>
                    </div>
                }
                {
                    endOfPage &&
                    <div style={{marginBottom: '20px'}}>
                        <div class="divider"></div>
                        <p className={'center-align'}>That's all for now!</p>
                    </div>
                }

            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { user, requesting, alert} = state;
    return {
        user,
        requesting,
        alert
    };
}

export default connect(mapStateToProps)(Posts);

import React, { Component } from 'react';
import Layout from "../Layout";
import {alertActions} from "../../_actions";
import {commonService} from "../../_services";
import {connect} from "react-redux";
import {appConstants} from "../../_constants";
import {history, appHelpers } from "../../_helpers";
import { InlinePageRequesting } from "../../utils/PageUtility";
import CommentPanel from "./comment.new";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: false,
            comment: '',
            comments: [],
            nextPage: null,
            endOfPage: false,
            limit: 10,
            currentPage: 1
        }
    }

    componentDidMount(){
        this.initializePage();
    }

    initializePage = () =>{
        const { dispatch } = this.props;
       const postId = this.props.match.params.postId;
        dispatch(alertActions.startRequest());
        commonService.getPostById(postId)
            .then(res =>{
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    this.setState({
                        post : res.response.data,
                        comments: res.response.data.comments
                    });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                   dispatch(alertActions.error(res.response.error));
                   history.push('/');
                }
                dispatch(alertActions.stopRequest());
            })

    };
    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const { comment, post } = this.state;
        let payload = {
            postId: post.id,
            message: comment,
            user: 'Anonymous'
        }

        console.log('comment', payload);
        this.setState({comment: ''})

    }
    fetchMoreComments = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        let { nextPage, limit, post } = this.state;
        let page = nextPage;

        if(!nextPage){
            limit = 13;
            page = 1
        }
        dispatch(alertActions.startRequest());
        let payload = {
            page,
            postId: post.id,
            size: limit
        };
        commonService.searchComments(payload)
            .then(res => {
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    console.log(res.response);
                    const { comments, page } = res.response.data;
                    let currComments = this.state.comments;
                    if(!nextPage){
                        currComments = comments;
                    }else{
                        currComments.unshift(...comments)
                    }
                    this.setState({
                        currentPage: page,
                        nextPage: (page + 1),
                        comments : currComments,
                        endOfPage: (comments.length === 0)
                    });
                    console.log('len', comments.length);

                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    }

    render() {
        const { post, comment, comments, endOfPage } = this.state;
        const { requesting } = this.props;
        return (
            <Layout>
                {
                    (!post) && (requesting) &&
                    <InlinePageRequesting/>
                }
                {
                    (post) &&
                    <div>
                        <h5>
                            {post.title}
                        </h5>
                        <p>
                            Created on {appHelpers.formatDate(post.createdAt)}
                        </p>

                        <p>
                            {post.description}
                        </p>

                        <div className="divider"></div>
                        <div>
                            <CommentPanel
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                comments={comments}
                                comment={comment}
                            />
                            {
                                !endOfPage && comments.length > 0 &&
                                <div style={{marginBottom: '20px'}} className={'col s12'}>
                                    <button className="waves-effect waves-light btn btn-small blue-grey darken-4"
                                            disabled={requesting}
                                            onClick={(e) => this.fetchMoreComments(e)}>
                                        <i className="material-icons left">cloud</i> Load more
                                    </button>
                                </div>
                            }
                        </div>
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
export default connect(mapStateToProps)(Post);

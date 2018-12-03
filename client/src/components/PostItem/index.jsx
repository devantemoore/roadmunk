import React, { Component } from 'react';
import Layout from "../Layout";
import {alertActions} from "../../_actions";
import {commonService} from "../../_services";
import {connect} from "react-redux";
import {appConstants} from "../../_constants";
import {history, appHelpers } from "../../_helpers";
import { InlinePageRequesting } from "../../utils/PageUtility";
import CommentPanel from "./comment.new";
import {store} from "../../_store";

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
            currentPage: 1,
            user: ''
        }
    }

    componentDidMount(){
        const { user } = store.getState();
        this.initializePage();
        this.setState({user})
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
        const { comment, post, user } = this.state;
        const { dispatch } = this.props;

        if(!comment || comment.length < 5){
            dispatch(alertActions.error('Please, provide your comment with a minimum of 5 characters'));
            return;
        }

        dispatch(alertActions.startRequest());
        let payload = {
            postId: post.id,
            message: comment,
            user: user.name
        };
        commonService.createComment(payload)
            .then(res => {
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    const comment = res.response.data;
                    let currComments = this.state.comments;
                    currComments.unshift(comment);
                    this.setState({
                        comments: currComments,
                        comment: '',
                    });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    }
    fetchMoreComments = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        let { nextPage, limit, post } = this.state;
        let page = nextPage;

        if(!nextPage){
            limit = 10;
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
                    const { comments, page } = res.response.data;
                    let currComments = this.state.comments;
                    currComments.push(...comments);
                    this.setState({
                        currentPage: page,
                        nextPage: (page + 1),
                        comments : currComments,
                        endOfPage: (comments.length === 0)
                    });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    };
    render() {
        const { post, comment, comments, endOfPage } = this.state;
        const { requesting } = this.props;
        return (
            <Layout classes={'white'}>
                {
                    (!post) && (requesting) &&
                    <InlinePageRequesting/>
                }
                {
                    (post) &&
                    <div>
                        <h5 className={'text-capitalize'}>
                            {post.title}
                        </h5>
                        <p>
                            Created on {appHelpers.formatDate(post.createdAt)}
                        </p>

                        <p className={'text-capitalize-first'}>
                            {post.description}
                        </p>

                        <div className="divider">&nbsp;</div>
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

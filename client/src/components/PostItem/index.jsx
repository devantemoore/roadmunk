import React, { Component } from 'react';
import Layout from "../Layout";
import PostImage from "../../assets/images/postImage.jpg";
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
            post: false
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
                    });
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                   dispatch(alertActions.error(res.response.error));
                   history.push('/');
                }
                dispatch(alertActions.stopRequest());
            })

    };

    render() {
        const { post } = this.state;
        const { requesting } = this.props;
        return (
            <Layout>
                {
                    (!post) && (requesting) &&
                    <InlinePageRequesting/>
                }
                {
                    (post) && (!requesting) &&
                    <div style={{background: '#fff', height: '100vh', padding: '5px 15px'}}>
                        <h5>
                            {post.title}
                        </h5>
                        <p>
                            {post.description}
                        </p>
                        <div className="divider"></div>
                        <div>
                            <CommentPanel comments={post.comments}/>
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

import React, { Component } from 'react';
import Layout from "../Layout";
import {alertActions} from "../../_actions";
import {commonService} from "../../_services";
import {connect} from "react-redux";
import {appConstants} from "../../_constants";
import {history } from "../../_helpers";
import PostPanel from "./post.new";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const { title, description } = this.state;
        const { dispatch } = this.props;

        //validate form
        if(!title || ! description){
            dispatch(alertActions.error('All fields are compulsory'));
            return;
        }
        dispatch(alertActions.startRequest());
        let payload = {
            title,
            description
        };

        commonService.createPost(payload)
            .then(res => {
                if(res.status === appConstants.SUCCESS_RESPONSE){
                    const post = res.response.data;
                    history.push(`/${post.id}`);
                    dispatch(alertActions.clear());
                } else if (res.status === appConstants.ERROR_RESPONSE) {
                    dispatch(alertActions.error(res.response.error));
                }
                dispatch(alertActions.stopRequest());
            });
    }
    render() {
        const { title, description } = this.state;
        const { requesting } = this.props;
        return (
            <Layout classes={'white'}>
                <PostPanel
                    requesting={requesting}
                    title={title}
                    description={description}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
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

import React, { Component } from 'react';
import {connect} from "react-redux";
import { ProgressBar } from "../../utils/ProgressBar";
import { alertConstants } from "../../_constants";
import { Header } from "./header";
import Snackbar from "@material-ui/core/Snackbar";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            notificationIsVisible: false
        }
    }
    componentWillReceiveProps(nextProps){
        const { alert } = nextProps;
        if(alert){
            if(alert.type === alertConstants.SUCCESS ) {
                this.setState({error: false, success: alert.message});
            }
            else if(alert.type === alertConstants.CLEAR ){
                this.setState({success: false, error: false})
            }
            else if(alert.type === alertConstants.ERROR ){
                this.setState({success: false, error: alert.message });
                this.showNotification();
                // dispatch(alertActions.clear());
            }
        }
    }
    clearAlertTimeout() {
        if (this.alertTimeout !== null) {
            clearTimeout(this.alertTimeout);
        }
    }
    showNotification() {
        this.setState({notificationIsVisible: true});
        this.clearAlertTimeout();
        this.alertTimeout = setTimeout(
            function() {
                this.setState({notificationIsVisible: false});
            }.bind(this),
            10000
        );
    }

    render() {
        const { classes, children, requesting } = this.props;
        const { error, notificationIsVisible} = this.state;
        return (
            <div>
                <ProgressBar progress={requesting}/>
                <Header/>

                <div className="container">
                    <div className="row">
                        <div className={`col m8 push-m2 s10 push-s1 layout-content ${classes}`}>
                            {
                                error &&
                                <div className={'red p-4'}>
                                    {
                                        <Snackbar
                                            place="tr"
                                            color="danger"
                                            message={error}
                                            open={notificationIsVisible}
                                        />
                                    }
                                </div>
                            }
                            {children}
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(Layout);

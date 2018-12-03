import React, { Component } from 'react';
class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col m8 push-m2 s10 push-s1 layout-content">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;

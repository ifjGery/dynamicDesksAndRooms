import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateForward } from './actions';

import NavigatonButtonView from '../../components/NavigationButton';

class ForwardNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavigatonButtonView 
                        onNavigation={() => this.props.navigateForward(this.props.nextPage, this.props.isRootNavigation)}
                        onClick={this.props.onClick}
                >
                    {this.props.children}
                </NavigatonButtonView>
            </>
        )
    }
}

export default connect(
    null,
    { navigateForward }
)(ForwardNavigation);
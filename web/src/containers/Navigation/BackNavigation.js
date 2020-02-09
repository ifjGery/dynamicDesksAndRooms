import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateBack } from './actions';

import NavigatonButtonView from '../../components/NavigationButton';

class BackNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavigatonButtonView onNavigation={this.props.navigateBack}>Back</NavigatonButtonView>
            </>
        )
    }
}

export default connect(
    null,
    { navigateBack }
)(BackNavigation);
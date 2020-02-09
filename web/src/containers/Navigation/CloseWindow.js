import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeWindow } from './actions';

import NavigatonButtonView from '../../components/NavigationButton';

class CloseWindow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavigatonButtonView onNavigation={this.props.changeWindow}>X</NavigatonButtonView>
            </>
        )
    }
}

export default connect(
    null,
    { changeWindow }
)(CloseWindow);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppView from '../../components/App';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppView activePage={this.props.activePage} activeWindow={this.props.activeWindow} />
            </>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activePage: state.navigation.activePage,
        activeWindow: state.navigation.activeWindow 
    };
};

export default connect(mapStateToProps)(App);
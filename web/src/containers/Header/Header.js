import React, { Component } from 'react';
import HeaderView from '../../components/Header';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <HeaderView onSelectedView={this.props.onSelectedView} />
            </>
        );
    }
}

export default Header;
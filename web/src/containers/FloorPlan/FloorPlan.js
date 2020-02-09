import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloorPlanView from '../../components/FloorPlan';
import { saveMapState } from './actions';

class FloorPlan extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <FloorPlanView startState={this.props.startState} onSaveState={this.props.saveMapState} >
                    {this.props.children}
                </FloorPlanView>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        startState: state.map
    };
};

export default connect(mapStateToProps, { saveMapState })(FloorPlan);
import React from 'react';

class PopUpNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: [
                "new room is available",
                "the XY room has freed up",
                "please rate your room experience"
            ],
            activeNotification: 0
        }
    }

    render() {
        return (
            <div className="PopUpNotification fixed">
                <button className="upButton" onClick={() => this.setActiveNotification(this.state.activeNotification + 1)}>U</button>
                <button className="downButton" onClick={() => this.setActiveNotification(this.state.activeNotification - 1)}>D</button>
                {this.state.notification[this.state.activeNotification]}
                <button className="closeButton" onClick={this.props.closeButton}>X</button>
            </div>
        );
    }

    setActiveNotification(index) {
        let newIndex = index < 0 ? 0 : index >= this.state.notification.length ? this.state.notification.length-1 : index;
        this.setState({activeNotification: newIndex});
    }
}

export default PopUpNotification;
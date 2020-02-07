import React from 'react';
import Hammer from 'hammerjs';
import style from './style.css'
import L1 from '../../assets/floor/L1';
import ControlButtons from '../../components/ControlButton'

class FloorMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            zoom: 1,
            pan: {x: 0, y: 0} 
        }
        this.svg = null;
        this.boundingRect = null;
        this.pan = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {

        this.svg = document.getElementById('svg8');

        

        this.boundingRect = document.getElementById('layer1').getBoundingClientRect();
        let parentBoundingRect = this.svg.parentElement.getBoundingClientRect();
        this.svg.setAttribute("width", parentBoundingRect.width);
        this.svg.setAttribute("height", parentBoundingRect.height);
        
        let newState = {
            pan: {
                x: parentBoundingRect.width / 2 - this.boundingRect.width / 2,
                y: parentBoundingRect.height / 2 - this.boundingRect.height / 2
            }
        };
        this.updateTransform(this.state.zoom, newState.pan);
        
        let mc = new Hammer.Manager(this.svg);
        mc.add(new Hammer.Pan());

        let locBin = this.updatePan.bind(this);
        mc.on('pan', locBin);

        this.setState(newState);

        let selectable = document.getElementsByClassName('room_or_desk');

        for (let one of selectable) {
            one.addEventListener('click', this.elementSelected);
        }
    }

    updatePan(event) {
        this.pan.x = this.state.pan.x + event.deltaX / this.state.zoom;
        this.pan.y = this.state.pan.y + event.deltaY / this.state.zoom;
        this.updateTransform(this.state.zoom, this.pan);
        if (event.srcEvent.type === 'pointerup') {
            this.setState({pan: this.pan});
            this.pan = {x:0, y:0};
        }
    }

    setZoom(zoom) {
        let zoomChange = zoom - this.state.zoom;
        let centerPoint = this.convertScreenToView({x:this.boundingRect.width/2,y:this.boundingRect.height/2}, this.state.zoom, this.state.pan);
        let panChange = {
            x: this.state.pan.x - (centerPoint.x * zoomChange),
            y: this.state.pan.y - (centerPoint.y * zoomChange)
        }
        let newState = {zoom,pan : panChange};
        this.setState(newState);
        this.updateTransform(newState.zoom, newState.pan);
    }

    convertScreenToView(point,zoom,pan) {
        return {
            x: point.x * zoom - pan.x,
            y: point.y * zoom - pan.y
        }
    }

    convertViewToScreen(point,zoom,pan) {
        return {
            x: (point.x + pan.x) / zoom,
            y: (point.y + pan.y) / zoom
        }
    }

    buildTransformString(zoom,pan) {
        return `scale(${zoom}) translate(${pan.x} ${pan.y})`;
    }

    updateTransform(zoom,pan) {
        let image = document.getElementById('layer1');
        image.setAttribute("transform", this.buildTransformString(zoom, pan));
    }

    elementSelected(event) {
        console.log(event);
    }

    render() {
        return (
            <div className="FloorMap" style={style.FloorMap}>
                <L1 />
                <div className="zoomButtons">
                    <ControlButtons className="navIcon" content="+" onClick={() => this.setZoom(this.state.zoom + 0.25)} />
                    <ControlButtons className="navIcon" content="-" onClick={() => this.setZoom(this.state.zoom - 0.25)} />
                </div>
            </div>
        );
    }
}

export default FloorMap;

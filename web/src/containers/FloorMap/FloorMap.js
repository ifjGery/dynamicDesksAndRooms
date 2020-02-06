import React from 'react';
import Hammer from 'hammerjs';
import style from './style.css'
import L1 from '../../assets/floor/L1';
import ZoomButtons from './ZoomButtons';

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
        this.boundingRect = document.getElementById('layer1');
        let parentBoundingRect = this.svg.parentElement.getBoundingClientRect();
        setViewPort(parentBoundingRect.width, parentBoundingRect.height);
        let newState = {
            pan: {
                x: parentBoundingRect.width / 2 - this.boundingRect.width / 2,
                y: parentBoundingRect.height / 2 - this.boundingRect.height / 2
            }
        };
        this.updateTransform(this.state.zoom, newState.pan);
        
        let mc = new Hammer.Manager(this.svg);
        mc.add(new Hammer.Pan());

        mc.on('pan', this.updatePan.bind(this));

        function setViewPort(width, height) {
            let image = document.getElementById('svg8');
            image.setAttribute("width", width);
            image.setAttribute("height", height);
        }

        this.setState(newState);
    }

    updatePan(event) {
        this.pan.x = this.state.pan.x + event.deltaX / this.state.zoom;
        this.pan.y = this.state.pan.y + event.deltaY / this.state.zoom;
        debugger;
        this.updateTransform(this.state.zoom, this.pan);
        if (event.srcEvent.type === 'pointerup') {
            this.setState({pan: this.pan});
            this.pan = {x:0, y:0};
        }
    }

    setZoom(zoom) {
        console.log(zoom);
        let newState = {zoom,pan : this.state.pan} ;
        this.setState(newState);
        this.updateTransform(newState.zoom, newState.pan);
    }

    buildTransformString(zoom,pan) {
        return `scale(${zoom}) translate(${pan.x} ${pan.y})`;
    }

    updateTransform(zoom,pan) {
        let image = document.getElementById('layer1');
        image.setAttribute("transform", this.buildTransformString(zoom, pan));
    }

    render() {
        return (
            <div className="FloorMap">
               <L1 />
               <ZoomButtons 
                    zoomIn={() => this.setZoom(this.state.zoom + 1)} 
                    zoomOut={() => this.setZoom(this.state.zoom - 1)}
               />
            </div>
        );
    }
}

export default FloorMap;

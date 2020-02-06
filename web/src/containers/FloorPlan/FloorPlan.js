import React from 'react';
import Hammer from 'hammerjs';
import style from './style.css'
import L1 from '../../assets/floor/L1';
import { func } from 'prop-types';

class FloorPlan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            zoom: 1,
            pan: {
                x: 0,
                y: 0
            } 
        }
        this.svg = null;
    }

    componentDidMount() {
        let zoom = 1;
        let pan = {
            x: 0,
            y: 0
        };

        this.svg = document.getElementById('svg8');
        let boundingRect = this.svg.parentElement.getBoundingClientRect();
        setViewPort(boundingRect.width, boundingRect.height);
        updateTransform(this.state.zoom, this.state.pan);

        let mc = new Hammer.Manager(this.svg);
        let Pan = new Hammer.Pan()

        mc.add(Pan);

        console.log(Pan);

        let last = {
            x: 0,
            y: 0
        }

        mc.on('pan', function(e) {
            console.log(e);
            pan.x += e.deltaX - last.x;
            pan.y += e.deltaY - last.y;
            last.x = e.deltaX;
            last.y = e.deltaY;
            updateTransform(zoom, pan);
            if (e.srcEvent.type === 'pointerup') {
                last.x = 0;
                last.y = 0;
            }
        });        

        function setZoom(z) {
            zoom = z;
        }

        function setViewPort(width, height) {
            let image = document.getElementById('svg8');
            image.setAttribute("width", width);
            image.setAttribute("height", height);
        }

        function setPan(x,y) {
            pan = {x,y};
        }

        function updateTransform(zoom, pan) {
            let image = document.getElementById('layer1');
            image.setAttribute("transform", buildTransformString(zoom, pan));
        }

        function buildTransformString(zoom,pan) {
            return `scale(${zoom}) translate(${pan.x} ${pan.y})`;
        }
    }

    render() {
        return (
            <div className="FloorPlan">
               <L1 />
            </div>
        );
    }
}

export default FloorPlan;

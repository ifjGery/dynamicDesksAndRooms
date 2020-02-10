import React, { useEffect, useLayoutEffect } from 'react';
import { RESERVATION_PAGE } from './constants';
import useMap from '../containers/FloorPlan/useMap';
import useNavigation from '../containers/Navigation/useNavigation';
import Hammer from 'hammerjs';

function FloorPlan({children}) {
    const { mapState, saveMapState } = useMap();
    const { navigateForward, changeSelected } = useNavigation();
    const ownElement = React.createRef();

    const updatePan = (element, pan) => element.setAttribute('transform', `translate(${pan.x} ${pan.y})`);

    useEffect(() => {
        // setting up constants
        
        const ownRect = ownElement.current.getBoundingClientRect();
        const transformLayer = document.getElementById('layer1');
        const selectables = document.getElementsByClassName('room_or_desk');
        const svg = document.getElementById('floorPlanSvg');

        // setting initial pan

        updatePan(transformLayer, mapState.pan);

        // setting svg size
        ownElement.current.children[0].setAttribute("width", ownRect.width);
        ownElement.current.children[0].setAttribute("height", ownRect.height);

        // making the desks and rooms clickable

        for (let one of selectables) {
            one.addEventListener('click', (e) => {changeSelected(e.target.id); navigateForward(RESERVATION_PAGE, true);});
        }

        // making the map dragable
        const mc = new Hammer.Manager(svg);

        let pan = {
            x: 0,
            y: 0
        };

        mc.add(new Hammer.Pan());
        mc.on('pan', (e) => {
            pan.x = mapState.pan.x + e.deltaX / mapState.zoom;
            pan.y = mapState.pan.y + e.deltaY / mapState.zoom;
            updatePan(transformLayer, pan);
            if (e.srcEvent.type === 'pointerup') {
                mapState.pan= pan;
                pan = {x:0, y:0};
            }
        })

        return () => {
            saveMapState(mapState);
        };
    }, [])

    return (
        <div className="floorPlan" ref={ownElement}>
            {children}
            <div className="zoom">
                <button onClick={() => []}>+</button><br/ >
                <button onClick={() => []}>-</button>
            </div>
        </div>
    );
}

export default FloorPlan;
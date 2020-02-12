import React, { useEffect, useRef, createRef } from 'react';
import { RESERVATION_PAGE } from './constants';
import useMap from '../containers/FloorPlan/useMap';
import useNavigation from '../containers/Navigation/useNavigation';
import Hammer from 'hammerjs';

function FloorPlan({children}) {
    const { mapState, saveMapState } = useMap();
    const { navigateForward, changeSelected } = useNavigation();
    const ownElement = createRef();
    const transformLayer = useRef(null);
    
    const setZoom = zoom => {
        let newZoom = zoom < 1 ? 1 : zoom;
        console.log(newZoom);
        mapState.zoom = newZoom;
        updatePan(transformLayer.current, mapState);
    }

    const updatePan = (element, mapState) => element.setAttribute('transform', `scale(3) translate(${mapState.pan.x} ${mapState.pan.y})`);

    const selectables = document.getElementsByClassName('room_or_desk');

    useEffect(() => {
        for (let one of selectables) {
            if (('id_' + one.id) in mapState.reserved) {
                one.dataset.reserved = mapState.reserved['id_' + one.id];
            }
        }
    });

    useEffect(() => {
        // setting up constants
        
        transformLayer.current = document.getElementById('layer1');
        const ownRect = ownElement.current.getBoundingClientRect();
        const svg = document.getElementById('floorPlanSvg');
        const layerRect = transformLayer.current.getBoundingClientRect();

        // setting svg size
        ownElement.current.children[0].setAttribute("width", ownRect.width);
        ownElement.current.children[0].setAttribute("height", ownRect.height);

        // setting initial pan

        if(mapState.pan.x === 0 && mapState.pan.y === 0) {
            mapState.pan = {
                x: (ownRect.width / 2 - layerRect.width / 2) / 3,
                y: (ownRect.height / 2 - layerRect.height / 2) / 3
            };
        }

        updatePan(transformLayer.current, mapState);

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
            pan.x = mapState.pan.x + e.deltaX / 3;
            pan.y = mapState.pan.y + e.deltaY / 3;
            updatePan(transformLayer.current, {pan, zoom: mapState.zoom});
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
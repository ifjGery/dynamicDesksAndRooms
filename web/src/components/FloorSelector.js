import React, { useState } from 'react';

function FloorSelector() {
    const [ activeFloor, setActiveFloor ] = useState("L1");
    const [ floors, setFloors ] = useState([
        "L1",
        "L2",
        "L3"
    ]);

    return (
        <div className="floorSelector">
            {floors.map(floor => <div><button className={activeFloor === floor ? "selected" : ""}>{floor}</button></div> )}
        </div>
    )
}

export default FloorSelector
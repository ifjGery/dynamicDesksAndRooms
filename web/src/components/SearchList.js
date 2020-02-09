import React, { useState } from 'react';

function List({finded}) {
    return (
        <>
        {
            finded.map(find =>
                <li>
                    <button>
                        {find.type} {find.id} {find.free ? "free" : "reserved"}
                    </button>
                </li>
                )
        }
        </>
    )
}

function SearchList() {
    const [ finded, setFinded ] = useState([
        {
            id: "115",
            type: "desk",
            free: true,
            level: 1
        },
        {
            id: "116",
            type: "room",
            free: false,
            level: 2
        }
    ]);

    return (
        <div className="searchList">
            <ul>
                <List finded={finded} />
            </ul>
        </div>
    )
}

export default SearchList;
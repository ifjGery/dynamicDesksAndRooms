import React from 'react';

function NavigationButton({onNavigation, onClick ,children}) {
    return (
        <>
            <button onClick={() => {onNavigation(); onClick && onClick()}}>{children}</button>
        </>
    );
}

export default NavigationButton;
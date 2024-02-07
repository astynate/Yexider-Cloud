﻿import React, { useState, useEffect } from 'react';
import light from '../../global/images/light.png';
import dark from '../../global/images/dark.png';

const ColorMode = () => {

    const [mode, setMode] = useState(() => localStorage.getItem('color-mode') || 'light');
    const [imagePath, setImagePath] = useState(() => mode === 'light' ? dark : light);

    const toggleColorMode = () => {

        const newMode = mode === 'light' ? 'dark' : 'light';

        setMode(newMode);
        setImagePath(newMode === 'light' ? dark : light);

        document.querySelector('#root').className = newMode;
        localStorage.setItem('color-mode', newMode);

    };

    useEffect(() => {

        document.querySelector('#root')
            .className = mode;

    }, []);

    return (
        <div className="color-mode" onClick={toggleColorMode}>
            <img src={imagePath} alt="Color Mode" draggable="false" />
        </div>
    );

};

export default ColorMode;
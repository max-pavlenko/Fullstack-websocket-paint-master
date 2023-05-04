import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";
import canvasState from "../store/canvasState";

const Window = () => {
    const [pressedKeys, setPressedKeys] = useState({});

    function managePressedKeys(e){
        setPressedKeys(prev => ({...prev, [e.code]: e.type === 'keydown'}));
    }

    useEffect(() => {
        document.body.onkeydown = document.body.onkeyup = managePressedKeys
        return () =>{
            document.body.onkeydown = document.body.onkeyup = null;
        }
    }, []);

    useEffect(() => {
        const {KeyZ, ControlLeft: Ctrl, ShiftLeft: Shift} = pressedKeys
        if (Ctrl && Shift && KeyZ ) {
            canvasState.redo()
        }
        else if (KeyZ && Ctrl) {
            canvasState.undo()
        }
    }, [pressedKeys]);

    return (
        <div>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
};

export default Window;

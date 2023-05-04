import React from 'react';
import "./styles/app.css"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Window from "./components/Window";


const App = () => {
    return (
        <BrowserRouter>
            <div className = "app">
                <Routes>
                    <Route path = '/' element = {<Window/>}>
                    </Route>
                    {/*<Navigate to = {`${(+new Date).toString(16)}`}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;

import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {DataProvider} from "./context/data.context";
import HomeRoute from "./routes/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <DataProvider>
                <Switch>
                    <Route exact path={'/'} component={HomeRoute}/>
                </Switch>
            </DataProvider>
        </BrowserRouter>
    );
}

export default App;

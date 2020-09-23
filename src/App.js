import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {DataProvider} from "./context/data.context";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

const HomeRoute = React.lazy(() => import("./routes/Home"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <DataProvider>
                    <Switch>
                        <Route exact path={'/'} component={HomeRoute}/>
                    </Switch>
                </DataProvider>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;

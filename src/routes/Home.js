import React, {useContext, useEffect, useState} from 'react';
import {DataContext} from '../context/data.context';
import Table from '../components/table/Table';
import BasicShell from "../shell/basicShell";


const App = () => {
    const {ready, getAllEventData} = useContext(DataContext);
    const [events, setEvents] = useState([]); // Not setting initial state for dummy async code
    const [loading, setLoading] = useState(false); // Loading indicator until data from the api loaded successfully

    useEffect(() => {
        if (ready) {
            setEvents([...getAllEventData()]);
            setLoading(false);
        }
    }, [ready]);

    return (
        <BasicShell>
            <h1>
                {loading ? 'loading' : <Table events={events}/>}
            </h1>
        </BasicShell>
    );
};

export default App;

import React, {Fragment, useContext, useEffect, useState} from 'react';
import {DataContext} from '../context/data.context';
import Table from '../components/table/Table';
import BasicShell from "../shell/basicShell";
import download from 'downloadjs';
import * as moment from "moment";

let ics = require("ics");


const App = () => {
    const {ready, getAllEventData} = useContext(DataContext); // Reading Data from context api
    const [events, setEvents] = useState([]); // Not setting initial state for dummy async code
    const [loading, setLoading] = useState(false); // Loading indicator until data from the api loaded successfully
    const [eventFileDataToExport, setEventFileDataToExport] = useState(null); // Loading indicator until data from the api loaded successfully

    const downloadIcs = (e) => {
        e.preventDefault();
        if (!eventFileDataToExport) {
            const eventToExport = events.map(event => {
                const eventStartDate = moment(event.startDate, "YYYY-MM-DD").format("YYYY-MM-DD").split("-");
                const eventEndDate = moment(event.endDate, "YYYY-MM-DD").format("YYYY-MM-DD").split("-");
                return {
                    title: event.title,
                    start: eventStartDate,
                    end: eventEndDate,
                    calName: "AbsenceCalendar"
                }
            });


            const {error, value} = ics.createEvents(eventToExport);
            if (error) {
                console.log(error);
                return
            }
            setEventFileDataToExport(value);
            download(value, "AbsenceCalendar.ics", "text/plain");
        }

        download(eventFileDataToExport, "AbsenceCalendar.ics", "text/plain");
    };

    useEffect(() => {
        if (ready) {
            setEvents([...getAllEventData()]);
            setLoading(false);
        }
    }, [ready]);

    return (
        <BasicShell>
            {loading ? 'loading...' :
                <Fragment>
                    <div className={"clearfix"}>
                        <button className={"btn btn-secondary float-right"} onClick={downloadIcs}>Download</button>
                    </div>
                    <Table events={events}/>
                </Fragment>
            }
        </BasicShell>
    );
};

export default App;

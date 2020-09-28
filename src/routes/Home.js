import React, {Fragment, Suspense, useContext, useEffect, useState} from 'react';
import {DataContext} from '../context/data.context';
import download from 'downloadjs';
import querystring from "querystring";
import PropTypes from "prop-types";
import moment from 'moment';

const BasicShell = React.lazy(() => import("../shell/basicShell"));
const Table = React.lazy(() => import("../components/table/Table"));

let ics = require("ics");

const HomePage = ({location}) => {
    const {getAllEventData} = useContext(DataContext); // Reading Data from context api
    const [events, setEvents] = useState([]); // Not setting initial state for mock async code
    const [loading, setLoading] = useState(true); // Dummy Loading indicator until data from the api loaded successfully
    const [eventFileDataToExport, setEventFileDataToExport] = useState(null); // Save data locally to avoid loop every time


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
        let searchTerm = location.search.slice(1);
        let queryParamsObject = querystring.parse(searchTerm);
        setEvents([...getAllEventData(queryParamsObject)]);
        setLoading(false);
    }, []); //To get all sync data on component mount

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BasicShell>{/*Included on page level for better visibility and control */}
                {loading ? 'loading...' :
                    <Fragment>
                        {events.length > 0 && <div className={"clearfix"}>
                            <button className={"btn btn-secondary float-right download"} onClick={downloadIcs}>Download</button>
                        </div>}
                        <Suspense fallback={<div>Loading...</div>}>
                            <Table events={events}/>
                        </Suspense>
                    </Fragment>
                }
            </BasicShell>
        </Suspense>
    );
};

HomePage.propTypes = {
    location: PropTypes.object.isRequired
};

export default HomePage;

import React from 'react';
import {PropTypes} from 'prop-types';
import absences from '../json_files/absences';
import members from '../json_files/members';
import moment from "moment";

export const DataContext = React.createContext(null);

export const getAllMembers = () => {
    const hash = {};
    members.payload.forEach(member => {
        hash[member.userId] = member;
    });
    return hash;
};

export const getUserNameWithType = (userName, absenceType) => {
    switch (absenceType) {
        case "sickness" :
            return `${userName} is sick`;
        case "vacation" :
            return `${userName} is on vacation`;
        default :
            return `${userName} is on vacation`;
    }
};

const getEventByUserId = (allAbsences, userId) => {
    return allAbsences.filter(absence => parseInt(absence.userId) === parseInt(userId));
};

const getEventByStartEndDate = (allAbsences, startDate, endDate) => {
    return allAbsences.filter(absence => moment(absence.startDate) >= moment(startDate) && moment(absence.endDate) <= moment(endDate));
};

export const getAllAbsences = filters => {
    let allMatchedEvents = [];
    let allAbsences = absences.payload;
    const allMembers = getAllMembers();
    const noFilters = Object.keys(filters).length === 0;

    if ("userId" in filters) {
        allMatchedEvents = getEventByUserId(allAbsences, filters.userId);
    }
    if ("startDate" in filters && "endDate" in filters) {
        if (allMatchedEvents.length) allAbsences = allMatchedEvents;
        allMatchedEvents = getEventByStartEndDate(allAbsences, filters.startDate, filters.endDate);
    }

    if (noFilters) {
        allMatchedEvents = allAbsences;
    }

    allMatchedEvents = allMatchedEvents.map(event => {
            const userName = allMembers[event.userId].name;
            const absenceType = event.type.toLowerCase();
            return {
                ...event,
                confirmedAt: moment(event.confirmedAt).format("YYYY-MM-DD"),
                createdAt: moment(event.createdAt).format("YYYY-MM-DD"),
                title: getUserNameWithType(userName, absenceType)
            }
        }
    );

    return allMatchedEvents;
};


export const DataProvider = props => {
    const {
        children
    } = props;

    const getAllEventData = filters => getAllAbsences(filters);


    return (
        <DataContext.Provider
            value={{
                getAllEventData
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataContext.propTypes = {
    initialData: PropTypes.instanceOf(Object)
};

DataContext.defaultProps = {
    initialData: {}
};

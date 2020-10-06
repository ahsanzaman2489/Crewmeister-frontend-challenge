import React from 'react';
import absences from '../json_files/absences';
import members from '../json_files/members';
import moment from "moment";

export const DataContext = React.createContext(null);

export const getAllMembers = () => { //Creating member has map to read data without loop
    const hash = {};
    members.payload.forEach(member => {
        hash[member.userId] = member;
    });
    return hash;
};

export const getUserNameWithType = (userName, absenceType) => {//Setting up title against absence type
    switch (absenceType) {
        case "sickness" :
            return `${userName} is sick`;
        case "vacation" :
            return `${userName} is on vacation`;
        default :
            return `${userName} is on vacation`;
    }
};

const getEventByUserId = (allAbsences, userId) => { //return Filter only userId specific data
    return allAbsences.filter(absence => parseInt(absence.userId) === parseInt(userId));
};

const getEventByStartEndDate = (allAbsences, startDate, endDate) => {// return filter data between date ranges
    return allAbsences.filter(absence => moment(absence.startDate) >= moment(startDate) && moment(absence.endDate) <= moment(endDate));
};

export const getAllAbsences = filters => {//Returning filtered data if there is filters and all data if no filter
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
};//Context provider

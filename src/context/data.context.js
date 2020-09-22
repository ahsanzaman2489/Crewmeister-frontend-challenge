import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import absences from '../json_files/absences';
import members from '../json_files/members';

export const DataContext = React.createContext(null);

export const DataProvider = props => {
    const {
        children
    } = props;

    const [state, setState] = useState({ready: false, events: []});
    const getAllAbsences = () => absences.payload;

    const getAllMembers = () => {
        const hash = {};
        members.payload.forEach(member => {
            hash[member.userId] = member;
        });
        return hash;
    };

    const getAllEventData = () => state.events;

    const getEventByUserId = (userId) => {
        let {...allEvents} = getAllEventData();
        return allEvents.filter(event => event.userId === userId);
    };

    const getUserNameWithType = (userName, absenceType) => {
        switch (absenceType) {
            case "sickness" :
                return `${userName} is sick`;
            case "vacation" :
                return `${userName} is on vacation`;
            default :
                return `${userName} is on vacation`;
        }
    };


    useEffect(() => (() => {
        const allAbsences = getAllAbsences();
        const allMembers = getAllMembers();

        let allEvents = allAbsences.map(event => {
                const userName = allMembers[event.userId].name;
                const absenceType = event.type.toLowerCase();
                return {
                    ...event,
                    name: getUserNameWithType(userName, absenceType)
                }
            }
        );

        setState(state => {
            return {...state, ready: true, events: [...allEvents]}
        });
    })(), []); // Setting up initial state

    return (
        <DataContext.Provider
            value={{
                ready: state.ready,
                getAllEventData,
                getEventByUserId,
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

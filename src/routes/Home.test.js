import React from 'react';
import {mount} from 'enzyme';
import Home from './Home';
import renderer from "react-test-renderer";
import {DataContext} from "../context/data.context";
import download from "downloadjs";

const testData = [{
    "admitterId": null,
    "admitterNote": "",
    "confirmedAt": "2016-12-12T18:03:55.000+01:00",
    "createdAt": "2016-12-12T14:17:01.000+01:00",
    "crewId": 352,
    "endDate": "2017-01-13",
    "id": 2351,
    "memberNote": "",
    "rejectedAt": null,
    "startDate": "2017-01-13",
    "type": "sickness",
    "userId": 2664
}, {
    "admitterId": null,
    "admitterNote": "",
    "confirmedAt": "2016-12-12T18:03:55.000+01:00",
    "createdAt": "2016-12-12T14:17:01.000+01:00",
    "crewId": 352,
    "endDate": "2017-01-13",
    "id": 2351,
    "memberNote": "",
    "rejectedAt": null,
    "startDate": "2017-01-13",
    "type": "sickness",
    "userId": 2664
}];

jest.mock('downloadjs', (data, fileName, fileType) => {
    const fn = jest.fn(() => {
        return {
            data, fileName, fileType
        }
    });

    return fn;
});

jest.mock('moment', () => {

    const momentParams = {
        format: jest.fn(() => '10/04/2020'),
    };

    const fn = jest.fn(newMoment => {
        momentParams.format = jest.fn(() => newMoment);
        return momentParams;
    });

    return fn;
});

const setup = (props = {}, state = null, contextData) => {
    let contextValue = {
        getAllEventData: jest.fn().mockImplementationOnce(() => []),
    };
    const defaultProps = {
        location: {
            search: '/'
        }
    };

    if (contextData) {
        contextValue = {
            getAllEventData: jest.fn().mockImplementationOnce(() => [...contextData]),
        };
    }

    const setUpProps = {...defaultProps, ...props};
    const wrapper = mount(<DataContext.Provider value={contextValue}><Home {...setUpProps}/></DataContext.Provider>);
    const tree = () => renderer.create(<DataContext.Provider
        value={contextValue}><Home {...setUpProps}/></DataContext.Provider>).toJSON();

    if (state) wrapper.setState(state);
    return {wrapper, props: setUpProps, tree};
};

describe("Home component", () => {

    it('should match with snapshot', () => {
        const {tree} = setup();
        expect(tree()).toMatchSnapshot();
    });

    it('should hide download button if absences length is zero', () => {
        const {wrapper} = setup({}, null);

        expect(wrapper.find('.download').length).toBe(0);
    });

    it('should show download button if absences length greater then 0', () => {
        const {wrapper} = setup({}, null, [testData[0]]);

        expect(wrapper.find('.download').length).toBe(1);
    });

    it('Should not render rows properly when there is no data and message will be there', () => {
        const {wrapper} = setup({}, null, []);
        expect(wrapper.find('tbody tr td').text()).toBe('No matching records found');
    });

    it('Should render rows properly when there is matched data', () => {
        const {wrapper} = setup({}, null, testData);

        expect(wrapper.find('tbody tr').length).toBe(2);
    });

    it('should call function to download file', () => {
        const {wrapper} = setup({}, null, [testData[0]]);

        wrapper.find('.download').simulate('click');
        expect(download).toHaveBeenCalled();
    });


});
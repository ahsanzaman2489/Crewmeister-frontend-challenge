import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

it('should render the Title Component correctly', () => {
    let wrapped = shallow(<App/>);
    expect(wrapped).toMatchSnapshot();
});

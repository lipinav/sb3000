/**
 * @jest-environment jsdom
 */
import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  // test('should render', () => {
  //   const wrapper = shallow(<Dropdown children={<div />} button={<button />}/>);

  //   expect(wrapper).toBeDefined();
  //   console.log(wrapper.find('div.container').debug());
  //   console.log(window);

  //   expect(wrapper.find('#button')).toBeDefined();  // wrong
  //   expect(wrapper.find('div.container').isEmptyRender()).toBeFalsy();
  // })

  // test('should render (snapshot)', () => {
  //   const wrapper = shallow(<Dropdown children={<div />} button={<button />}/>);

  //   expect(wrapper).toMatchSnapshot();
  // })
})

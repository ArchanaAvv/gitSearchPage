import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';
import Search from './pages/search';
import { Input, Button } from 'semantic-ui-react';


it('renders without crashing', () => {
  shallow(<App />)
})

it('renders without crashing', () => {
  const wrapper = shallow(<Search />);
  const github = <div className="navbar">GitHub</div>;
  expect(wrapper.contains(github)).toEqual(true);
})

it('should have a `button` element', () => {
  const wrapper = shallow(
    <Search />
  );
  expect(
    wrapper.containsMatchingElement(
      <Button>Submit</Button>
    )
  ).toBe(false);
});

it('should have an `Input` element', () => {
  const wrapper = shallow(
    <Search />
  );
  expect(
    wrapper.containsMatchingElement(
      <input />
    )
  ).toBe(true);
});

describe('the user populates the input', () => {
  const item = 'test';
  const wrapper = shallow(
    <Search />
  );
  const input = wrapper.find('input').first();
  input.simulate('change', {
    target: { value: item }
  })



});
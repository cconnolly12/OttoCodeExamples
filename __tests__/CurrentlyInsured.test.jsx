/* eslint-disable no-undef */
import { create } from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import auto24Variant from '../../../../../Testing/Variants/Auto/13001.json';
import auto28Variant from '../../../../../Testing/Variants/Auto/14001.json';
import Auto42CurrentlyInsured from '../Auto28/Pages/CurrentlyInsured';
import auto42Variant from '../../../../../Testing/Variants/Auto/18001.json';
import Auto43CurrentInsurer from '../Auto43/Pages/CurrentInsurer';
import auto43Variant from '../../../../../Testing/Variants/Auto/19001.json';
import Auto48CurrentInsurer from '../Auto48/Pages/CurrentInsurer';
import auto48Variant from '../../../../../Testing/Variants/Auto/21001.json';
import ProgressCurrentInsurer from '../Progress/Pages/CurrentInsurer';
import progressVariant from '../../../../../Testing/Variants/Auto/3008.json';
import SimpleCurrentlyInsured from '../Simple/Pages/CurrentlyInsured';
import simpleVariant from '../../../../../Testing/Variants/Auto/8006.json';

global.scrollTo = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Auto 23 Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: auto24Variant };
    const auto = { currentPage: 'currentlyInsured', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<Auto42CurrentlyInsured />);
    instance = component.root;
  });
  test('Test that Yes has value of Yes', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-true' });
    button.props.onClick();
    expect(button.props.value).toEqual(true);
  });

  test('Test that No has value of No', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-false' });
    button.props.onClick();
    expect(button.props.value).toEqual(false);
  });

  test('Incorrect Yes Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-true' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Yes');
  });

  test('Incorrect No Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-false' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('No');
  });
});

describe('Auto 28 Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: auto28Variant };
    const auto = { currentPage: 'currentlyInsured', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<Auto42CurrentlyInsured />);
    instance = component.root;
  });
  test('Test that Yes has value of Yes', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-Yes' });
    button.props.onClick();
    expect(button.props.value).toEqual('Yes');
  });

  test('Test that No has value of No', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).toEqual('No');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Yes');
  });
});

describe('Auto 42 Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: auto42Variant };
    const auto = { currentPage: 'currentlyInsured', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<Auto42CurrentlyInsured />);
    instance = component.root;
  });
  test('Test that Yes has value of Yes', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-Yes' });
    button.props.onClick();
    expect(button.props.value).toEqual('Yes');
  });

  test('Test that No has value of No', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).toEqual('No');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Yes');
  });
});

describe('Auto 43 Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: auto43Variant };
    const auto = { currentPage: 'currentInsurer', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<Auto43CurrentInsurer />);
    instance = component.root;
  });
  test('Not insured should return notInsured', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-notInsured' });
    button.props.onClick();
    expect(button.props.value).toEqual('notInsured');
  });

  test('Test that American Family Insurance to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-American Family Insurance' });
    button.props.onClick();
    expect(button.props.value).toEqual('American Family Insurance');
  });

  test('Test AAA (Auto Club) to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-AAA (Auto Club)' });
    button.props.onClick();
    expect(button.props.value).toEqual('AAA (Auto Club)');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-AAA (Auto Club)' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Liberty Mutual');
  });
});

describe('Auto 48 Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: auto48Variant };
    const auto = { currentPage: 'currentInsurer', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<Auto48CurrentInsurer />);
    instance = component.root;
  });
  test('Not insured should return notInsured', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-notInsured' });
    button.props.onClick();
    expect(button.props.value).toEqual('notInsured');
  });

  test('Test that Nationwide to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Nationwide Mutual Insurance Company' });
    button.props.onClick();
    expect(button.props.value).toEqual('Nationwide Mutual Insurance Company');
  });

  test('Test Liberty Mutual to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Liberty Mutual' });
    button.props.onClick();
    expect(button.props.value).toEqual('Liberty Mutual');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Progressive Casualty' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Liberty Mutual');
  });
});

describe('Progress Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: progressVariant };
    const auto = { currentPage: 'currentInsurer', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<ProgressCurrentInsurer />);
    instance = component.root;
  });
  test('Not insured should return false', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-false' });
    button.props.onClick();
    expect(button.props.value).toEqual(false);
  });

  test('Test that Farmers to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Farmers Insurance Group' });
    button.props.onClick();
    expect(button.props.value).toEqual('Farmers Insurance Group');
  });

  test('Test that Geico to value to match', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Geico' });
    button.props.onClick();
    expect(button.props.value).toEqual('Geico');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentInsurer-Geico' });
    button.props.onClick();
    expect(button.props.value).not.toEqual(false);
  });
});

describe('Simple Test for Currently Insured Values', () => {
  let instance;
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const main = { transitioning: true, variantObject: simpleVariant };
    const auto = { currentPage: 'currentlyInsured', skipPages: [] };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const component = create(<SimpleCurrentlyInsured />);
    instance = component.root;
  });
  test('Test that Yes has value of Yes', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-Yes' });
    button.props.onClick();
    expect(button.props.value).toEqual('Yes');
  });

  test('Test that No has value of No', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).toEqual('No');
  });

  test('Incorrect Value, test Should fail', () => {
    const button = instance.findByProps({ testing_id: 'currentlyInsured-No' });
    button.props.onClick();
    expect(button.props.value).not.toEqual('Yes');
  });
});

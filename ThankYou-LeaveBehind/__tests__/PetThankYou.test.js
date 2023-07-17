/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import PetThankYou from '../PetThankYou';
import variant from '../../../../../../Testing/Variants/Pet/3001.json';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(true),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test Pet Thank You Page Snapshot', () => {
  test('Pet Thank You page renders correctly', () => {
    const mockDispatch = jest.fn();
    const main = { customOffers: {}, siteID: 'c388128c-0e88-455b-8f49-7b31151785e0', variantObject: variant };
    const pet = { trackedSteps: [], trackedExitSteps: [], state: 'FL' };
    const store = { main, pet };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const page = renderer
      // eslint-disable-next-line react/jsx-filename-extension
      .create(<PetThankYou />);
    expect(page).toMatchSnapshot();
  });
});

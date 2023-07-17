/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import ThankYou from '../ThankYou';
import variant from '../../../../../../Testing/Variants/Auto/3011.json';

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

describe('Test Thank You Page Snapshot', () => {
  test('Thank You page renders correctly', () => {
    const mockDispatch = jest.fn();
    const main = { customOffers: {}, variantObject: variant };
    const auto = { trackedSteps: [], trackedExitSteps: [], state: 'FL' };
    const store = { main, auto };
    useSelector.mockImplementation((callback) => callback(store));
    useDispatch.mockReturnValue(mockDispatch);
    const page = renderer
      // eslint-disable-next-line react/jsx-filename-extension
      .create(<ThankYou />);
    expect(page).toMatchSnapshot();
  });
});

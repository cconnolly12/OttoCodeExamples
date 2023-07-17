/* eslint-disable no-undef */
import { validateSingleDriver } from '../Name';

jest.mock('../Name', () => {
  const actualModule = jest.requireActual('../Name');
  return {
    ...actualModule,
  };
});

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    status: true,
    message: 'OK',
  }),
}));

afterEach(() => {
  jest.resetAllMocks();
});

describe('Validate First and Last Name for Auto Forms', () => {
  test('Validating that first and last name are valid', () => {
    const driverState = { firstName: 'Bob', lastName: 'Smith' };
    const validateName = validateSingleDriver(driverState, 1, {}, []);
    expect(validateName).toEqual({ errors: {}, validationPromises: [Promise.resolve({})] });
  });
  test('Validating that first name is not empty', () => {
    const driverState = { firstName: '', lastName: 'Smith' };
    const validateName = validateSingleDriver(driverState, 1, {}, []);
    expect(validateName).toEqual({ errors: { firstName1: 'Please enter a valid name' }, validationPromises: [] });
  });
  test('Validating that last name is not empty', () => {
    const driverState = { firstName: 'Bob', lastName: '' };
    const validateName = validateSingleDriver(driverState, 1, {}, []);
    expect(validateName).toEqual({ errors: { lastName1: 'Please enter a valid name' }, validationPromises: [] });
  });
  test('Validating that first name is not a number', () => {
    const driverState = { firstName: '4', lastName: 'Smith' };
    const validateName = validateSingleDriver(driverState, 1, {}, []);
    expect(validateName).toEqual({ errors: { firstName1: 'Please enter a valid name' }, validationPromises: [] });
  });
  test('Validating that last name is not a number', () => {
    const driverState = { firstName: 'Bob', lastName: '7' };
    const validateName = validateSingleDriver(driverState, 1, {}, []);
    expect(validateName).toEqual({ errors: { lastName1: 'Please enter a valid name' }, validationPromises: [] });
  });
});

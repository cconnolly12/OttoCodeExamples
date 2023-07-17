/* eslint-disable no-undef */
import { validationMapping } from '../validationMapping';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ city: 'Los Alamitos', stateAbbreviation: 'CA' }),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('Validation mapping works correctly', () => {
  test('Zipcode validation exists', async () => {
    const autoStore = { zipCode: '90720' };
    const validationValue = await validationMapping('zipCode', autoStore);
    expect(validationValue.storeName).toEqual('zipCode');
  });
  test('Address validation exists', async () => {
    const autoStore = { address: '429 Lenox Ave' };
    const validationValue = await validationMapping('address', autoStore);
    expect(validationValue.storeName).toEqual('address');
  });
  test('Dob validation exists', async () => {
    const autoStore = { currentDriver: 1, driverState1: { dob: '01-01-1991' } };
    const validationValue = await validationMapping('dob', autoStore);
    expect(validationValue.storeName).toEqual('dob');
  });
  test('Dob year validation exists', async () => {
    const autoStore = { currentDriver: 1, driverState1: { dob: '01-01-1991' } };
    const validationValue = await validationMapping('dobYear', autoStore);
    expect(validationValue.storeName).toEqual('dobYear');
  });
  test('Dob month validation exists', async () => {
    const autoStore = { dobMonth: '01' };
    const validationValue = await validationMapping('dobMonth', autoStore);
    expect(validationValue.storeName).toEqual('dobMonth');
  });
  test('Email validation exists', async () => {
    const autoStore = { email: 'test@example.com' };
    const validationValue = await validationMapping('email', autoStore);
    expect(validationValue.storeName).toEqual('email');
  });
  test('Multi name validation exists', async () => {
    const autoStore = { driverState1: { firstName: 'Bob', lastName: 'Smith' }, driverState2: { firstName: 'Jenna', lastName: 'Jones' } };
    const validationValue = await validationMapping('names', autoStore);
    expect(validationValue.storeName).toEqual('names');
  });
  test('Name validation exists', async () => {
    const autoStore = { currentDriver: 1, driverState1: { firstName: 'Bob', lastName: 'Smith' } };
    const validationValue = await validationMapping('name', autoStore);
    expect(validationValue.storeName).toEqual('name');
  });
  test('Phone validation exists', async () => {
    const autoStore = { phone: '8008768408' };
    const mainStore = { uuid: '487a6061-49ab-411f-ae49-e765b0fb16d2' };
    const validationValue = await validationMapping('phone', autoStore, mainStore);
    expect(validationValue.storeName).toEqual('phone');
  });
  test('Square feet validation exists', async () => {
    const autoStore = { squareFeet: '2500' };
    const validationValue = await validationMapping('squareFeet', autoStore);
    expect(validationValue.storeName).toEqual('squareFeet');
  });
  test('Year built validation exists', async () => {
    const autoStore = { yearBuilt: '2020' };
    const validationValue = await validationMapping('yearBuilt', autoStore);
    expect(validationValue.storeName).toEqual('yearBuilt');
  });
  test('Property Coverage validation exists', async () => {
    const autoStore = { propertyCoverage: '2000' };
    const validationValue = await validationMapping('propertyCoverage', autoStore);
    expect(validationValue.storeName).toEqual('propertyCoverage');
  });
  test('Vehicle make validation exists', async () => {
    const autoStore = { currentVehicle: 1, vehicleState1: { make: 'Toyota' } };
    const validationValue = await validationMapping('make', autoStore);
    expect(validationValue.storeName).toEqual('make');
  });
  test('Dwelling type validation exists', async () => {
    const autoStore = { dwellingType: 'Single Family' };
    const validationValue = await validationMapping('dwellingType', autoStore);
    expect(validationValue.storeName).toEqual('dwellingType');
  });
  test('City validation exists', async () => {
    const autoStore = { city: 'Los Angeles' };
    const validationValue = await validationMapping('city', autoStore);
    expect(validationValue.storeName).toEqual('city');
  });
  test('State validation exists', async () => {
    const autoStore = { state: 'CA' };
    const validationValue = await validationMapping('state', autoStore);
    expect(validationValue.storeName).toEqual('state');
  });
});

import { useDispatch, useSelector } from 'react-redux';
import styles from './transunion.module.css';
import {
  deleteNestedStateKey,
  renameNestedStateKey, updateAutoSingleKey,
} from '../../../../../redux/Modules/Auto/Auto.actions';

export default ({ customStyles = {} }) => {
  const dispatch = useDispatch();
  const classes = { ...styles, ...customStyles };
  const autoStore = useSelector((store) => store.auto);
  const buildLoopObject = (stateKey) => {
    const object = [];
    Object.keys(autoStore).forEach((key) => {
      if (key.includes(stateKey)) {
        const values = autoStore[key];
        object.push({
          keyName: key,
          ...values,
        });
      }
    });
    return object;
  };
  const removeRow = (keyName) => {
    const nameMinusNumber = `${keyName.split('State')[0]}State`;
    dispatch(deleteNestedStateKey({
      storeKey: keyName,
    }));
    if (autoStore[`${nameMinusNumber}3`] && keyName === `${nameMinusNumber}2`) {
      dispatch(renameNestedStateKey({
        newKey: `${nameMinusNumber}2`,
        oldKey: `${nameMinusNumber}3`,
      }));
    } else if (autoStore[`${nameMinusNumber}2`] && keyName === `${nameMinusNumber}1`) {
      dispatch(renameNestedStateKey({
        newKey: `${nameMinusNumber}1`,
        oldKey: `${nameMinusNumber}2`,
      }));
    } else if (!autoStore[`${nameMinusNumber}2`] && keyName === `${nameMinusNumber}1`) {
      dispatch(updateAutoSingleKey(keyName, {}));
      dispatch(updateAutoSingleKey('currentVehicle', 1));
    }
  };

  const vehicles = () => buildLoopObject('vehicleState').map((row) => (
    <div className={classes.section}>
      <div className={classes.sectionText}>
        {row.year}
        {' '}
        {row.make}
        {' '}
        {row.model}
        {' '}
        {row.trim}
      </div>
      <div className={classes.removeButtonContainer}>
        <button
          className={classes.removeButton}
          type="button"
          onClick={() => removeRow(row.keyName)}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  const drivers = () => buildLoopObject('driverState').map((row) => (
    <div className={classes.section}>
      <div className={classes.sectionText}>
        {row.firstName}
        {' '}
        {row.lastName}
      </div>
      <div className={classes.removeButtonContainer}>
        {row.keyName !== 'driverState1' && (
          <button
            className={classes.removeButton}
            type="button"
            onClick={() => removeRow(row.keyName)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      {buildLoopObject('vehicleState').length && buildLoopObject('vehicleState')[0].year
        && (
        <>
          <div className={`${classes.title} ${classes.transunionTitle}`}>Vehicles:</div>
          <div className={classes.sectionContainer}>
            {vehicles()}
          </div>
        </>
        )}
      <div className={`${classes.title} ${classes.transunionTitle}`}>Drivers:</div>
      <div className={classes.sectionContainer}>
        {drivers()}
      </div>
    </div>
  );
};

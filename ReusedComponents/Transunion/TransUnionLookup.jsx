import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularLoader from '../../../../helpers/CircularLoader';
import currentPageData from '../../../../helpers/CurrentPageData';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import {
  updateAutoSingleKey,
  updateAutoStateAction,
} from '../../../../../redux/Modules/Auto/Auto.actions';
import getFirstPage from '../../../../helpers/getFirstPage';
import baseURL from '../../../../helpers/OttoEndpoint';
import styles from '../../../../../styles/transUnionLookup.module.css';

const TransUnionLookup = (
  {
    formStyles,
    overridestyles,
    loaderClass = '',
  },
) => {
  const dispatch = useDispatch();
  const { variantObject, uuid } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const { showLoader } = useSelector((state) => state.auto);
  const { transunion_banner } = currentPageData(currentPage, variantObject);
  const onClick = async () => {
    dispatch(updateAutoSingleKey('showLoader', true));
    const params = {
      params: {
        form_id: variantObject.transUnionForm || variantObject.form,
        variant_id: variantObject.transUnionVariant,
        user_id: uuid,
        otto_form: true,
        action: 'get_transunion_variant',
      },
    };
    const req = `${baseURL()}/api/v2/external/auto.php`;
    const response = await fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const transUnionVariant = await response.json();
    dispatch(
      updateMainStateAction({ variantObject: JSON.parse(transUnionVariant) }),
    );

    dispatch(updateAutoStateAction({
      currentPage: getFirstPage(JSON.parse(transUnionVariant)),
      currentDriver: 1,
      showLoader: false,
    }));
  };

  return transunion_banner ? (
    <div className="flex items-center justify-center">
      <div className={styles.transunionContainer}>
        <p>{transunion_banner.transunionText}</p>
        <button
          styles={{ ...overridestyles }}
          className={`${styles.transunionButton} ${formStyles && formStyles.transunionButton}`}
          onClick={onClick}
          type="submit"
          disabled={showLoader}
        >
          { showLoader
            ? <CircularLoader customClass={loaderClass} fill="fill-[#00835a]" color="text-transparent" />
            : transunion_banner.transunionButtonText}
        </button>
      </div>
    </div>
  ) : '';
};

export default TransUnionLookup;

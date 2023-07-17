import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormObject1 from './Form1/FormObject1';
import CreateForm from './CreateForm';
import classes from './form.module.css';
import updateVerticalStore from '../../../../../../helpers/useUpdateVerticalStore';
import usePrevious from '../../../../../../helpers/usePrevious';
import baseURL from '../../../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../../../redux/Modules/Main/main.actions';
import BiddingOffers from '../Bidding/BiddingOffers';
import { getVerticalFromSiteID } from '../../../../../../helpers/getSiteID';

const DynamicForm = function () {
  const formObject = FormObject1;
  const {
    geoData, query, uuid, siteID, affid, variantObject,
  } = useSelector((state) => state.main);
  const pages = Object.keys(formObject.pages);
  const dispatch = useDispatch();
  const site = getVerticalFromSiteID(siteID);
  const updateStore = updateVerticalStore();
  const { leaveBehindState = {}, zipCode } = useSelector((store) => store[site]);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  const lastPage = usePrevious(currentPage);
  const [collapseForm, setCollapseForm] = useState(false);
  const [closedForm, setClosedForm] = useState(false);
  const [completedForm, setCompletedForm] = useState(false);
  const currentPageObject = formObject.pages[currentPage];
  const { thankYouTitle } = variantObject;
  const {
    Header, ProgressBar, PostFormTitle, transitions,
  } = FormObject1;
  const getDynamicLeaveBehind = async () => {
    const params = {
      uuid,
      lbType: 'lbForm',
      affid: query?.affid || affid || 0,
      s5: query?.s5 || 'NA',
      site_id: siteID,
      contact: {
        zipCode: zipCode || geoData.zip,
      },
      driverState: {
        1: {
          licenseStatus: leaveBehindState.driversLicense || undefined,
          DOB: leaveBehindState.ageRange || undefined,
          driverDUI_DWI: leaveBehindState.DUI || undefined,
          driverTicketsAccidentsClaimsPast3Years: leaveBehindState.tickets || undefined,
          homeOwner: leaveBehindState.homeOwner || undefined,
          gender: leaveBehindState.gender || undefined,
          maritalStatus: leaveBehindState.maritalStatus || undefined,
        },
      },
      vehicleState: {
        1: {
          annualMileage: leaveBehindState.annualMileage || undefined,
          vehicleOwnership: leaveBehindState.vehicleOwnership || undefined,
        },
      },
      coverage: {
        lengthOfCurrentInsurance: leaveBehindState.lengthOfInsurances || undefined,
        currentlyInsured: leaveBehindState.currentlyInsured || undefined,
        driverCount: leaveBehindState.numberOfDrivers || undefined,
      },
      vehicleCount: leaveBehindState.numberOfVehicles || undefined,
    };
    const response = await fetch(`${baseURL()}/api/v2/external/lb_partial.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params }),
    });
    const clicklistingData = await response.json();
    if (clicklistingData && clicklistingData.success && clicklistingData.clickListing) {
      const clickListingObject = typeof clicklistingData.clickListing === 'string' ? JSON.parse(clicklistingData.clickListing) : clicklistingData.clickListing;
      if (typeof clickListingObject === 'object') {
        dispatch(updateMainStateAction({ leaveBehindListing: clickListingObject }));
      }
    }
  };

  useEffect(() => {
    if (lastPage !== currentPage) {
      getDynamicLeaveBehind();
    }
  }, [currentPage]);

  const updateLeaveBehindState = (value) => {
    const updateValue = typeof value === 'object'
      ? value
      : { [currentPage]: value };
    dispatch(updateStore.update(
      {
        leaveBehindState: {
          ...leaveBehindState,
          ...updateValue,
        },
      },
    ));
    const currentPageIndex = pages.indexOf(currentPage);
    let updateIndex = currentPageIndex + 1;
    const nextPage = pages[currentPageIndex + 1];
    if (leaveBehindState.currentlyInsured === '0' && nextPage === 'lengthOfInsurances') {
      updateIndex += 1;
    }
    const resetForm = !pages[updateIndex];
    if (resetForm) {
      setCollapseForm(true);
      setClosedForm(true);
      setCompletedForm(true);
    }
    if (transitions) {
      transitions();
    }
    setCurrentPage(pages[updateIndex] || pages[0]);
  };

  return (
    <div>
      <div className={`${classes.container}`}>
        <div className={classes.formTitle}>
          {thankYouTitle || 'Compare the'}
          {' '}
          <strong>Best Quotes</strong>
          {
            geoData && geoData.city && geoData.state && (
              <>
                {' '}
                for
                {' '}
                <strong>
                  {geoData.city}
                  ,
                  {geoData.state}
                </strong>
              </>
            )
          }
        </div>
        <div
          className={`${classes.dynamicFormContainer} ${collapseForm ? classes.collapsed : ''} ${closedForm ? classes.closedForm : ''}`}
        >
          {Header ? (
            <Header
              page={currentPageObject}
              collapseForm={collapseForm}
              setCollapseForm={setCollapseForm}
              setClosedForm={setClosedForm}
              classes={classes}
            />
          ) : ''}
          {ProgressBar ? (
            <ProgressBar
              page={currentPageObject}
              classes={classes}
              completedForm={completedForm}
            />
          ) : ''}
          <CreateForm
            onChange={updateLeaveBehindState}
            page={currentPageObject}
            transitions={transitions}
            classes={classes}
          />
          {PostFormTitle ? (
            <PostFormTitle
              page={currentPageObject}
              classes={classes}
            />
          ) : ''}
        </div>
        <div
          className={classes.postFormTitleContainer}
        >
          <hr />
          <div className={classes.formPostTitle}>
            { closedForm ? 'Success. Here are your results:' : 'Please answer the above:'}
          </div>
          <div className={classes.formPostTitle2}>
            <strong>Quotes</strong>
            {' '}
            will be
            {' '}
            <strong>more relevant</strong>
            {' '}
            to your needs:
          </div>
        </div>
        <BiddingOffers source="LB" />
      </div>
    </div>
  );
};

export default DynamicForm;

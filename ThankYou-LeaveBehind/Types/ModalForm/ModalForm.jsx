import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormFields from './ModalForm/FormFields';
import style from './modalForm.module.css';
import baseURL from '../../../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../../../redux/Modules/Main/main.actions';
import updateVerticalStore from '../../../../../../helpers/useUpdateVerticalStore';
import BiddingOffers from '../Bidding/BiddingOffers';
import { getVerticalFromSiteID } from '../../../../../../helpers/getSiteID';
import UpdateFilters from './ModalForm/UpdateFilters';
import { Filters } from '../../../../../../../public/icons/filters';
import LoaderDots from '../../../../../../helpers/LoaderDots';
import { getCurrentYear } from '../../../../../../helpers/getCurrentYear';

const ModalForm = function () {
  const {
    geoData, query, uuid, siteID, affid,
  } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const site = getVerticalFromSiteID(siteID);
  const updateStore = updateVerticalStore();
  const {
    leaveBehindState = {},
    zipCode,
  } = useSelector((store) => store[site]);
  const [showModal, setShowModal] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const getDynamicLeaveBehind = async () => {
    const params = {
      uuid,
      lbType: 'modal',
      affid: query?.affid || affid || 0,
      s5: query?.s5 || 'NA',
      site_id: siteID,
      contact: {
        zipCode: leaveBehindState.zipCode || zipCode || geoData.zip,
      },
      driverState: {
        1: {
          DOB: leaveBehindState.ageRange || undefined,
          driverDUI_DWI: leaveBehindState.ticketsOrDUI || undefined,
          driverTicketsAccidentsClaimsPast3Years: leaveBehindState.ticketsOrDUI || undefined,
          homeOwner: leaveBehindState.homeOwner,
          gender: leaveBehindState.gender || undefined,
          maritalStatus: leaveBehindState.maritalStatus || undefined,
        },
      },
      coreg: {
        bundleHomeInsurance: leaveBehindState.coreg,
        bundleRenterInsurance: false,
        ownedHome: false,
        squareFeet: '2500',
        yearBuilt: getCurrentYear() - 39,
        dwellingType: 'Single Family',
        propertyCoverage: 15000,
      },
      coverage: {
        currentlyInsured: leaveBehindState.currentlyInsured,
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
    getDynamicLeaveBehind();
    dispatch(updateStore.update(
      {
        leaveBehindState: {
          zipCode: zipCode || geoData.zip,
          homeOwner: true,
          numberOfVehicles: '1',
          numberOfDrivers: '1',
          ticketsOrDUI: '0',
        },
      },
    ));
  }, []);

  return (
    showLoader ? <LoaderDots /> : (
      <>
        <div className="sm:visible md:hidden sm:mt-[4rem]">
          <button
            className={style.filterButton}
            type="button"
            data-modal-hide="staticModal"
            onClick={() => {
              setShowModal(true);
              setShowFilters(true);
            }}
          >
            <Filters className={style.filterIcon} />
            {' '}
            Filter
          </button>
        </div>
        <div className="sm:hidden">
          <UpdateFilters
            getDynamicLeaveBehind={getDynamicLeaveBehind}
            setShowForm={setShowForm}
            setShowModal={setShowModal}
            setShowFilters={setShowFilters}
            setShowLoader={setShowLoader}
          />
        </div>
        {showModal && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            data-modal-placement="center"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full backdrop-brightness-75"
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
              <div className={`relative bg-white shadow ${showFilters && 'rounded-md'}`}>
                {showForm && !showFilters && (
                  <FormFields
                    getDynamicLeaveBehind={getDynamicLeaveBehind}
                    setShowModal={setShowModal}
                    setShowForm={setShowForm}
                    setShowLoader={setShowLoader}
                  />
                )}
                {showFilters && !showForm && (
                  <UpdateFilters
                    getDynamicLeaveBehind={getDynamicLeaveBehind}
                    setShowModal={setShowModal}
                    setShowFilters={setShowFilters}
                    setShowLoader={setShowLoader}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <BiddingOffers source="LB" />
      </>
    )
  );
};

export default ModalForm;

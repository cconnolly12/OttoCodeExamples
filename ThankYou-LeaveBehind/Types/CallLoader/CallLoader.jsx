import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BiddingOffers from '../Bidding/BiddingOffers';
import { getVerticalFromSiteID } from '../../../../../../helpers/getSiteID';

export default () => {
  const { siteID, tyType } = useSelector((store) => store.main);
  const site = getVerticalFromSiteID(siteID);
  const verticalStore = useSelector((store) => store[site]);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }, 1000);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-[75vh] text-[1.3em] text-[#5B6B81] bg-[#ffffff] flex">
      <div className="flex flex-col justify-start items-center mx-auto w-[100%] max-w-[1100px]">
        <div className="pt-[1.5rem] flex flex-col justify-start w-[1040px] max-w-[95%] ">
          <h1 className="font-semibold text-3xl">Congratulations!</h1>
          <p>One of agents will call you shortly. In the meantime...</p>
          <p>
            Click below to view the quotes provided by our featured insurer in
            {' '}
            {verticalStore.city}
            ,
            {' '}
            {verticalStore.state}
          </p>
        </div>
        <BiddingOffers source="TY" type={tyType} />
      </div>
    </div>

  );
};

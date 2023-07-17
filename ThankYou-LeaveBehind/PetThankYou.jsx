import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import AnimatedContainer from './Types/Animated/AnimatedContainer';
import usePrevious from '../../../../helpers/usePrevious';
import { useFirePixels } from '../../../../helpers/FirePixels';
import BiddingOffers from './Types/Bidding/BiddingOffers';
import CustomOffers from './CustomOffers';
import useStepTracker from '../../../../helpers/useStepTracker';
import baseURL from '../../../../helpers/OttoEndpoint';

const typeMapping = () => ({
  default: <BiddingOffers source="TY" />,
  animated: <AnimatedContainer source="TY" />,
  'animated-multiple': <AnimatedContainer source="TY" />,
});

const trackSpend = (store) => (
  fetch(
    `${baseURL()}/api/v2/external/spendData.php`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          params: {
            lead_age: 0,
            lead_id: document.getElementById('leadid_token').value || 'debug_mode_no_lead_id',
            affiliate_id: store.affid,
            site_id: store.siteID,
            user_id: store.uuid,
            user_agent: store.userAgent,
            sub_id: {
              s1: store?.query?.s1 || '',
              s2: store?.query?.s2 || '',
            },
            ip: store.ip,
            step: 'quotes',
          },
        },
      ),
    },
  )
);

export default () => {
  const firePixels = useFirePixels();
  const trackSteps = useStepTracker();
  const {
    tyType, pixels, thankYouHeaders, uuid, ...mainStore
  } = useSelector((store) => store.main);
  const thankYouListing = localStorage.getItem('TYlisting')
    ? JSON.parse(localStorage.getItem('TYlisting'))
    : mainStore.thankYouListing;

  const prevPixels = usePrevious(pixels);
  const showPetScript = thankYouListing && typeof thankYouListing !== 'object';
  useEffect(() => {
    trackSteps('quotes');
    setTimeout(() => trackSpend(mainStore), 200);
  }, []);
  useEffect(() => {
    if (showPetScript) {
      let ifrm = document.getElementById('adzaIframe');
      ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
      ifrm.document.open();
      ifrm.document.write(thankYouListing);
      ifrm.document.close();
    }
  }, [thankYouListing]);
  useEffect(() => {
    if (pixels && prevPixels !== pixels) {
      firePixels('ty');
    }
  }, [pixels, prevPixels]);

  const bottomPetText = () => (
    <div className="lg2:w-[100%] w-[65%] text-[left] xl2:pb-[6rem] mx-auto font-[400] font-['Roboto', sans-serif]">
      <div className="flex items-end">
        <h3 className="text-[#545454] text-[1.17em] font-[700] mt-[20px]">
          Introducing OTTO Pet - Your Ultimate Pet Insurance Comparison Tool
          <span style={{ fontSize: '25px', marginLeft: '5px' }}>&#128062;</span>
        </h3>
      </div>
      <p className="text-[#545454] my-[16px] leading-[1.2rem]">
        At OTTO Pet, we recognize the significance of pet insurance as a financial safety
        net for unexpected veterinary expenses.
        As a comparison service, we’re not an insurance provider, but we’re dedicated to
        helping you find the best insurance company to work with.
        Our user-friendly platform empowers you to effortlessly compare plans,
        coverage options, and reimbursement percentages, ensuring you
        find the perfect fit for your pet’s needs. Let OTTO Pet take the stress out of finding
        pet insurance, so you can make informed decisions for your beloved companion
        without worrying about unforeseen costs.
      </p>
      <p className="text-[#545454] my-[16px] leading-[1.2rem]">
        Pet insurance is a prudent choice
        for pet owners. It serves as a financial safeguard,
        shielding you from high veterinary treatment costs and other expenses.
        Acquiring pet insurance early on maximizes its benefits.
        The process is simple: provide information about your pet
        (species, breed, age, and basic medical history)
        to receive various options with different deductibles, reimbursements,
        limits, and coverage plans.
      </p>

      <h3 className="text-[#545454] text-[1.17em] font-[700] mt-[20px]">
        <span style={{ fontSize: '25px', marginRight: '5px' }}>&#x23F0;</span>
        When should you buy pet insurance?
      </h3>
      <p className="text-[#545454] my-[16px] leading-[1.2rem]">
        Comparing deductibles, coverage options, and reimbursement
        percentages is essential to finding the perfect fit for your needs.
        Many veterinarians also collaborate with insurance companies, streamlining the process.
      </p>

      <h3 className="text-[#545454] text-[1.17em] font-[700] mt-[20px]">
        <span style={{ fontSize: '25px', marginRight: '5px' }}>&#128200;</span>
        How does pet insurance work?
      </h3>
      <p className="text-[#545454] my-[16px] leading-[1.2rem]">
        Pet insurance’s true value extends beyond financial protection.
        It offers peace of mind, enabling you to make informed decisions for your
        companion without the added stress of financial constraints.
        Pet insurance allows you to provide your pet with care,
        free from the fear of unexpected expenses.
        It also helps you plan for future costs, such as regular check-ups,
        vaccinations, and preventive care, without added stress.
        Pet insurance is not only a wise financial decision but also a
        testament to being a responsible and loving pet owner.
      </p>
      <p className="text-[#545454] my-[16px] leading-[1.2rem]">
        Discover the best insurance company for your furry friend with OTTO Pet
        <span style={{ fontSize: '25px', marginInline: '5px' }}>&#128054;</span>
        <span style={{ fontSize: '25px', marginRight: '5px' }}>&#128049;</span>
        and give them the care they deserve without worrying about the costs.
      </p>
    </div>
  );

  const HeaderText = (
    <div className="sm:w-[100%] sm:pt-[2rem] w-[70%] m-auto text-center">
      <h1 className="text-[#000] text-[26px] font-[400]">
        Thank you for choosing our service.
      </h1>
      <h2 className="text-[#000] text-[20px] font-[200]">
        We've compared all the options and are proud to present this deal for you.
        Get coverage for your pet now!
      </h2>
    </div>
  );

  return (
    <div className="w-[100%] xl2:bg-[#1c6da4]">
      <div className="w-[100%] bg-[#fff] mx-auto sm:mt-[0] mt-[2rem] xl2:w-[98%] lg2:px-[1rem]">
        {HeaderText}
        <div id="placeClicklisting" />
        {showPetScript && (<iframe id="adzaIframe" title="advertisement" scrolling="no" className="overflow-hidden sm:w-[100%] w-[60%] sm:min-h-[30rem] min-h-[200px] m-auto" />)}
        {!showPetScript && (typeMapping()[tyType] || typeMapping().default)}
        <div className="lg2:w-[100%] w-[70%] mx-auto mt-[2rem]">
          <CustomOffers />
        </div>
        {bottomPetText()}
      </div>
    </div>
  );
};

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import genericStyles from './ty-lb-components.module.css';
import AnimatedContainer from './Types/Animated/AnimatedContainer';
import usePrevious from '../../../../helpers/usePrevious';
import { useFirePixels } from '../../../../helpers/FirePixels';
import HeaderReplacement from './HeaderReplacement';
import BiddingOffers from './Types/Bidding/BiddingOffers';
import CallLoader from './Types/CallLoader/CallLoader';
import useStepTracker from '../../../../helpers/useStepTracker';
import baseURL from '../../../../helpers/OttoEndpoint';
import RenderLifeBanner from '../../../Life/Forms/Life1/Components/LifeBanner';

const typeMapping = () => ({
  default: <BiddingOffers source="TY" showCustomOffers />,
  animated: <AnimatedContainer source="TY" />,
  call: <CallLoader source="TY" />,
  animatedNudge: <AnimatedContainer source="TY" />,
  'animated-multiple': <AnimatedContainer source="TY" />,
  'animated-multiple-2': <AnimatedContainer source="TY" />,
  'animated-multiple-3': <AnimatedContainer source="TY" />,
  'animated-multiple-4': <AnimatedContainer source="TY" />,
  'animated-multiple-5': <AnimatedContainer source="TY" />,
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

export default ({ customStyles = {} }) => {
  const firePixels = useFirePixels();
  const trackSteps = useStepTracker();
  const {
    vertical, tyType, thankYouListing, pixels, ...mainStore
  } = useSelector((store) => store.main);
  const prevPixels = usePrevious(pixels);
  useEffect(() => {
    trackSteps('quotes');
    setTimeout(() => trackSpend(mainStore), 200);
  }, []);
  useEffect(() => {
    if (pixels && prevPixels !== pixels) {
      firePixels('ty');
    }
  }, [pixels, prevPixels]);

  const returnStyleSheet = (className) => customStyles[className] || genericStyles[className];
  return (
    <div className={returnStyleSheet('container')}>
      {tyType === 'default' && (
        <HeaderReplacement
          classes={Object.keys(customStyles).length ? customStyles : genericStyles}
          tyType={tyType}
        />
      )}
      {vertical === 'Life' && <RenderLifeBanner /> }
      <div id="placeClicklisting" />
      {typeMapping()[tyType] || typeMapping().default}
    </div>
  );
};

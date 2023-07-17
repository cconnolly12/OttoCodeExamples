import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import animatedTYStyles from './animated.module.css';
import AnimatedOffers from './AnimatedOffers';
import NudgeModal from '../NudgeModal/NudgeModal';
import usePrevious from '../../../../../../helpers/usePrevious';

import AAALogo from '../../../../../../../public/images/insurance/AAAInsurance_Logo.png';
import FarmersLogo from '../../../../../../../public/images/insurance/FarmersInsurance_logo.png';
import ProgressiveLogo from '../../../../../../../public/images/insurance/Progressive_logo.png';
import LibertyMutualLogo from '../../../../../../../public/images/insurance/LibertyMutual_logo.png';
import NationwideLogo from '../../../../../../../public/images/insurance/Nationwide_Logo.png';
import BiBerk from '../../../../../../../public/images/insurance/biBerkLogo.png';
import Gallagher from '../../../../../../../public/images/insurance/Gallagher_logo.png';
import Hartford from '../../../../../../../public/images/insurance/the-hartford-insurance.png';
import ProgressivePetLogo from '../../../../../../../public/images/logos/pet/Progressive_Pet_logo.png';
import PetMarketplaceLogo from '../../../../../../../public/images/logos/pet/pet_insurance_marketplace_logo.png';
import BlueSkyLogo from '../../../../../../../public/images/logos/pet/blue_sky_insurance_logo.png';
import AllStateLogo from '../../../../../../../public/images/logos/Allstate_logo.png';
import LemonadeLogo from '../../../../../../../public/images/logos/pet/Lemonade_Pet_logo.png';

const autoLogos = {
  AAALogo,
  FarmersLogo,
  ProgressiveLogo,
  LibertyMutualLogo,
  NationwideLogo,
};

const commercialLogos = {
  Hartford,
  ProgressiveLogo,
  LibertyMutualLogo,
  BiBerk,
  Gallagher,
};

const petLogos = {
  ProgressivePetLogo,
  AllStateLogo,
  LemonadeLogo,
  PetMarketplaceLogo,
  BlueSkyLogo,
};

const verticalLogos = {
  Auto: autoLogos,
  Commercial: commercialLogos,
  Pet: petLogos,
};

export default (props) => {
  const {
    source, dontScrollUp,
  } = props;
  const [offerReady, setOfferReady] = useState(false);
  const [logoTransition, setLogoTransition] = useState('');
  const { main } = useSelector((state) => state);
  const { vertical } = main;
  const logos = verticalLogos[vertical] || verticalLogos.Auto;
  const logoKeys = Object.keys(logos);
  const [currentLogo, setCurrentLogo] = useState(logoKeys[0]);
  const [nextLogo, setNextLogo] = useState();
  const {
    tyType,
    lbType,
    thankYouListing,
  } = main;
  const prevNextLogo = usePrevious(nextLogo);
  const prevVertical = usePrevious(vertical);
  const prevCurrentLogo = usePrevious(currentLogo);
  const type = (source || '').toLowerCase() === 'lb' ? lbType : tyType;

  useEffect(() => {
    setTimeout(() => {
      if (offerReady !== true) {
        setOfferReady(true);
      }
    }, 5000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (prevVertical !== vertical) {
      setCurrentLogo(Object.keys(verticalLogos[vertical] || verticalLogos.Auto)[0]);
      setTimeout(() => (
        setNextLogo(Object.keys(verticalLogos[vertical] || verticalLogos.Auto)[1])
      ), 1000);
    }

    // eslint-disable-next-line
  }, [vertical, prevVertical]);

  const transitionOut = async () => (
    setLogoTransition('swipeOut')
  );

  const transitionIn = (nextLogoIndex) => {
    setTimeout(() => {
      if (nextLogo) {
        setCurrentLogo(nextLogo);
      }
      setLogoTransition('swipeIn');
      setTimeout(() => {
        if (logoKeys.indexOf(nextLogoIndex + 1)) {
          setNextLogo(logoKeys[nextLogoIndex + 1]);
        } else {
          if (!dontScrollUp) {
            window.scrollTo(0, 0);
          }
          setOfferReady(true);
        }
      }, 2000);
    }, 200);
  };

  useEffect(() => {
    if (
      nextLogo
      && (prevCurrentLogo !== currentLogo || prevNextLogo !== nextLogo)
    ) {
      const currentLogoIndex = logoKeys.indexOf(currentLogo);
      const nextLogoIndex = logoKeys.indexOf(nextLogo);
      if (
        currentLogoIndex > -1
        && currentLogoIndex !== logoKeys.length - 1
        && nextLogoIndex >= -1
      ) {
        transitionOut()
          .then(() => {
            transitionIn(nextLogoIndex);
          });
      }
    }
    // eslint-disable-next-line
  }, [currentLogo, nextLogo, prevCurrentLogo, prevNextLogo]);

  const getGeo = () => {
    const city = main.geoData.city || false;
    const state = main.geoData.state || false;
    return { city, state };
  };

  const returnOfferText = () => {
    const { city, state } = getGeo();
    if (!offerReady) {
      return 'Looking up the best quote for you!';
    }
    if (city && state && vertical === 'Home') {
      return (
        <div className="flex flex-col">
          <div className="w-[100%]">We Have a Winner!</div>
          <div className="w-[100%] md2:mt-[0px] mt-[-9px]">
            Cheaper Rates Below For
            {' '}
            {city}
            ,
            {state}
          </div>
        </div>
      );
    }
    if (city && state) {
      return `We Have A Winner! ${vertical !== 'Commercial' ? 'Cheaper' : ''} Rates Below For ${city}, ${state} :`;
    }
    return 'We Have A Winner!';
  };

  const returnOfferTextAnimatedMultiple = () => {
    if (!offerReady) {
      return 'Looking up the best quote for you!';
    }
    return '';
  };

  const returnOfferTextPet = () => {
    const { city, state } = getGeo();
    if (!offerReady) {
      return 'Looking up the best quote for you!';
    }
    if (city && state) {
      return (
        <div className="leading-9">
          <div>We Have A Winner!</div>
          <div>
            {thankYouListing.length > 0 && thankYouListing[0].buyer === 'LemonadeCPLPet'
              ? 'Better Value' : 'Cheaper Rates'}
            {' '}
            Below for
            {' '}
            {city}
            ,
            {' '}
            {state}
            {' '}
            :
          </div>
        </div>
      );
    }
    return 'We Have A Winner!';
  };

  const animatedMultipleView = () => (
    <div className="flex flex-col justify-center items-center w-[100%] m-[auto]">
      {offerReady && (
        <div
          className="m-auto mt-1.5 flex justify-center text-[#000] font-[600] xs:text-[22px] text-[22px] pb-[10px] xs:pb-[0px]"
        >
          Click a quote to see your savings!
        </div>
      )}
      <div
        id="animatedTYPage"
        className={offerReady ? animatedTYStyles.animatedMultipleOverlay : animatedTYStyles.overlay}
      >
        <div className={animatedTYStyles.offerContainer}>
          <div id="animatedOfferText" className={animatedTYStyles.title}>
            {returnOfferTextAnimatedMultiple()}
          </div>
          <div className={animatedTYStyles.logoOrOffer}>
            {!offerReady && (
              <div className={animatedTYStyles.logoContainer}>
                <div className={`${animatedTYStyles.logo} ${logoTransition && animatedTYStyles[logoTransition]}`}>
                  {logos[currentLogo] && (
                    <Image
                      src={logos[currentLogo]}
                      width={400}
                      height={200}
                      alt="insurance logo"
                      priority
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        margin: 'auto',
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            {offerReady && (
              <AnimatedOffers source={source} type={type} />
            )}
          </div>
        </div>
      </div>
    </div>

  );
  return (
    <>
      {vertical === 'Commercial' && (source || '').toLowerCase() !== 'lb' ? (
        <div className={animatedTYStyles.commercialTitle}>
          Thank You! You will be receiving a call from (405) or call 888-421-2609 now!
        </div>
      ) : ''}
      <div className={vertical === 'Pet' ? animatedTYStyles.petContainer : animatedTYStyles.container}>
        {(type.indexOf('multiple') !== -1) ? animatedMultipleView() : (
          <div id="animatedTYPage" className={`${animatedTYStyles.overlay}`}>
            <div className={animatedTYStyles.offerContainer}>
              <div id="animatedOfferText" className={`${animatedTYStyles.title}`}>
                {vertical === 'Pet' ? returnOfferTextPet() : returnOfferText()}
              </div>
              <div className={animatedTYStyles.logoOrOffer}>
                {!offerReady && (
                  <div className={animatedTYStyles.logoContainer}>
                    <div className={`${animatedTYStyles.logo} ${logoTransition && animatedTYStyles[logoTransition]}`}>
                      {logos[currentLogo] && (
                        <Image
                          src={logos[currentLogo]}
                          width={400}
                          height={200}
                          alt="insurance logo"
                          priority
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                {offerReady && (
                  <AnimatedOffers source={source} type={type} />
                )}
                {tyType === 'animatedNudge' && offerReady && (
                  <NudgeModal>
                    <AnimatedOffers source={source} type={type} />
                  </NudgeModal>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

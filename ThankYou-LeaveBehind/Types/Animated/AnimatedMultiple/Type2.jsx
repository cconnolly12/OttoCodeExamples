import OfferWithCTA from '../OfferWithCTA';
import animatedTYStyles from '../animated.module.css';

export default function Type2(
  {
    type,
    offers,
    logClick,
    secondaryAds,
  },
) {
  return (
    <>
      <OfferWithCTA
        ad={offers[0]}
        logClick={(e) => logClick(e, offers[0])}
        type={type}
      />
      {
        secondaryAds.map((additionalAd) => (
          <div className={animatedTYStyles.adContainerRevised} key={additionalAd.placement_id}>
            <div className={animatedTYStyles.offerLogoContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={animatedTYStyles.offerLogoAnimatedMultiple} src={additionalAd.logoUrl || ''} alt="Insurance Logo" />
            </div>
            <div className={animatedTYStyles.additionalCTAContainer}>
              <button className={animatedTYStyles.additionalOfferCTA} type="button" onClick={(event) => logClick(event, additionalAd)}>
                View My Quote
              </button>
              <span className={animatedTYStyles.hideMobile}>COMPARE RATES</span>
            </div>
          </div>
        ))
      }
    </>
  );
}

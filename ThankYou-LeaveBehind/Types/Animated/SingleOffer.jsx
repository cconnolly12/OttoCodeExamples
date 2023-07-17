import animatedTYStyles from './animated.module.css';

export default function ({ logClick, ad, type }) {
  return (
    <div className={type === 'animated-multiple' ? animatedTYStyles.adContainer : animatedTYStyles.moreMarginTopBottom}>
      <div className={animatedTYStyles.offerLogoContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={type === 'animated-multiple' ? animatedTYStyles.offerLogoAnimatedMultiple : animatedTYStyles.offerLogo} src={ad.logoUrl || ''} alt="Insurance Logo" />
      </div>
      <button className={type === 'animated-multiple' ? animatedTYStyles.offerButtonAnimatedMultiple : animatedTYStyles.offerButton} type="button" onClick={() => logClick(ad)}>
        Access Your Quote
      </button>
    </div>
  );
}

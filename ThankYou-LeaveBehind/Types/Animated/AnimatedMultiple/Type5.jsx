import { useEffect, useMemo } from 'react';
import classes from './type4.module.css';

export default function Type4(
  {
    thankYouListing,
    source,
    backUpOffer,
    offers,
    logClick,
    secondaryAds,
  },
) {
  const firstAd = useMemo(() => (thankYouListing.length < 1 && source === 'TY' ? backUpOffer : offers[0]), [thankYouListing, source, backUpOffer, offers]);

  useEffect(() => {
    if (firstAd.impression_pixel && typeof firstAd.impression_pixel === 'string') {
      try {
        const root = document.getElementById('pixel-placeholder');
        const pixelDocument = new DOMParser().parseFromString(firstAd.impression_pixel, 'text/html');
        if (pixelDocument && pixelDocument.documentElement) {
          root.appendChild(pixelDocument.documentElement);
        }
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.adContainerType4}>
        <div className={classes.placementOneType4}>#1</div>
        <div className={`${classes.adType4} ${firstAd.position && +firstAd.position < 3 ? classes.topAdType4 : ''}`}>
          <div className={classes.logoType4}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={firstAd.logoUrl} alt={firstAd.brandName} />
          </div>
          <div className={classes.contentSectionType4}>
            <div className={classes.titleType4}>
              {firstAd.title}
            </div>
            <div className={classes.bulletsType4}>
              <ul>
                {firstAd.bulletedDescription.map((bullet = '') => (
                  <li key={bullet.toString()} className={classes.bulletType4}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classes.ctaButtonContainerType4}>
            <button type="button" id="quoteButton" className={classes.ctaButtonType4} onClick={(event) => logClick(event, firstAd)}>
              View My Quote
            </button>
            <span className={classes.hideMobileType4}>COMPARE RATES</span>
          </div>
        </div>
      </div>

      {
        secondaryAds.map((additionalAd) => (
          <div className={classes.adContainerRevisedType4} key={additionalAd.placement_id}>
            <div className={classes.additionalHideMobileType4}>
              {firstAd.title}
            </div>
            <div className={classes.offerLogoContainerType4}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={classes.offerLogoAnimatedMultipleType4}
                src={additionalAd.logoUrl || ''}
                alt="Insurance Logo"
              />
            </div>
            <div className={classes.additionalCTAContainerType4}>
              <div className={classes.additionalHideMobileType4}>
                {firstAd.bulletedDescription[1]}
              </div>
              <button
                className={classes.additionalOfferCTAType4}
                type="button"
                onClick={(event) => logClick(event, additionalAd)}
              >
                View My Quote
              </button>
              <span className={classes.additionalHideMobileType4}>COMPARE RATES</span>
            </div>
          </div>
        ))
      }
    </>
  );
}

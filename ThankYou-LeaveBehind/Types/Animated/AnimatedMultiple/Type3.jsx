import { useEffect, useMemo } from 'react';
import classes from './type3.module.css';

export default function Type3(
  {
    offers,
    logClick,
    secondaryAds,
  },
) {
  const firstAd = useMemo(() => (offers[0]), [offers]);

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
      <div className={classes.adContainerType3}>
        <div className={classes.placementOneType3}>#1</div>
        <a
          onClick={(d) => logClick(d, firstAd)}
          className={`${classes.adType3} ${firstAd.position && +firstAd.position < 3 ? classes.topAdType3 : ''}`}
          href={firstAd.clickUrl}
        >
          <div className={classes.logoType3}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={firstAd.logoUrl} alt={firstAd.brandName} />
          </div>
          <div className={classes.contentSectionType3}>
            <div className={classes.titleType3}>
              {firstAd.title}
            </div>
            <div className={classes.bulletsType3}>
              <ul>
                {firstAd.bulletedDescription.map((bullet = '') => (
                  <li key={bullet.toString()} className={classes.bulletType3}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classes.ctaButtonContainerType3}>
            <div id="quoteButton" className={classes.ctaButtonType3}>
              View My Quote
            </div>
            <span className={classes.hideMobileType3}>COMPARE RATES</span>
          </div>
        </a>
      </div>

      {
        secondaryAds.map((additionalAd) => (
          <div className={classes.adContainerRevisedType3} key={additionalAd.placement_id}>
            <div>
              {firstAd.title}
            </div>
            <div className={classes.offerLogoContainerType3}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={classes.offerLogoAnimatedMultipleType3}
                src={additionalAd.logoUrl || ''}
                alt="Insurance Logo"
              />
            </div>
            <div className={classes.additionalCTAContainerType3}>
              <div>
                {firstAd.bulletedDescription[1]}
              </div>
              <button
                className={classes.additionalOfferCTAType3}
                type="button"
                onClick={(event) => logClick(event, additionalAd)}
              >
                View My Quote
              </button>
              <span className={classes.additionalHideMobileType3}>COMPARE RATES</span>
            </div>
          </div>
        ))
      }
    </>
  );
}

import React, { useEffect } from 'react';
import classes from '../Bidding/bidding.module.css';

const Logo = ({ ad }) => (
  <div className={classes.logo}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={ad.logoUrl} alt={ad.brandName} />
  </div>
);

export const Content = ({ ad }) => {
  const title = () => (
    <div className={classes.title}>
      {ad.title}
    </div>
  );
  const bullets = () => (
    <div className={classes.bullets}>
      <ul>
        {ad.bulletedDescription.map((bullet) => (
          <li key={bullet.toString()} className={classes.bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className={classes.contentSection}>
      {title()}
      {bullets()}
    </div>
  );
};

export const CTAButton = () => (
  <div className={classes.ctaButtonContainer}>
    <div id="quoteButton" className={classes.ctaButton}>
      View My Quote
    </div>
    <span className={classes.hideMobile}>COMPARE RATES</span>
  </div>
);

export default function OfferWithCTA({ logClick, ad }) {
  useEffect(() => {
    if (ad.impression_pixel && typeof ad.impression_pixel === 'string') {
      try {
        const root = document.getElementById('pixel-placeholder');
        const pixelDocument = new DOMParser().parseFromString(ad.impression_pixel, 'text/html');
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
    <div className={classes.adContainer}>
      <a
        onClick={(d) => logClick(d, ad)}
        className={`${classes.ad} ${ad.position && +ad.position < 3 ? classes.topAd : ''}`}
        href={ad.clickUrl}
      >
        <Logo ad={ad} />
        <Content ad={ad} />
        <CTAButton />
      </a>
    </div>
  );
}

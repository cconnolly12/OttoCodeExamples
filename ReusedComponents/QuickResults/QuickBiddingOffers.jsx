import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import baseURL from '../../../../helpers/OttoEndpoint';
import classes from './quickBidding.module.css';
import CustomOffers from '../../../Common/Components/ThankYou-LeaveBehind/CustomOffers';

const Logo = ({ ad }) => (
  <div className={classes.logo}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={ad.logoUrl} alt={ad.brandName} />
  </div>
);

const Content = ({ ad }) => {
  const title = () => (
    <div className={classes.title}>
      {ad.title}
    </div>
  );
  const bullets = () => (
    <div className={classes.bullets}>
      <ul>
        {ad.bulletedDescription.slice(0, 2).map((bullet) => (
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

const TYBiddingAd = ({ ad, logClick, key }) => {
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
    <div className={classes.adContainer} key={key}>
      <a
        onClick={(d) => logClick(d, ad)}
        className={`${classes.ad} ${ad.position && +ad.position < 3 ? classes.topAd : ''}`}
        href={ad.clickUrl}
      >
        <Logo ad={ad} classes={classes} />
        <Content ad={ad} classes={classes} />
      </a>
    </div>
  );
};

const QuickBiddingOffers = ({
  type = 'default', source, showCustomOffers = false,
}) => {
  const {
    affid, uuid, query, siteID, leaveBehindListing, thankYouListing,
  } = useSelector((store) => store.main);
  const offers = (source || '').toLowerCase() === 'lb' ? leaveBehindListing : thankYouListing;

  const logClick = async (event, ad) => {
    if (event && event.preventDefault && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    const params = {
      affid,
      uuid,
      action: 'logRevenue',
      s5: query?.s5 || '',
      publisherRevenue: ad.publisherRevenue,
      adCreativeId: ad.adCreativeId,
      advertiserId: ad.advertiserId,
      placement_id: ad.placement_id,
      buyer: ad.buyer,
      source,
      ty_type: type,
      site_id: siteID,
    };

    await fetch(
      `${baseURL()}/api/v2/external/ty_log.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params }),
      },
    );
    window.location.href = ad.clickUrl;
  };
  const sortedAds = useMemo(() => (offers && typeof offers === 'object' && offers.sort ? offers : []).sort((a, b) => +a.position - +b.position), [offers]);
  return (
    <div className={`${classes.container} mt-5`}>
      {sortedAds.map((ad) => (
        <TYBiddingAd ad={ad} logClick={logClick} key={ad.placement_id} />
      ))}
      {showCustomOffers ? <CustomOffers /> : ''}
    </div>
  );
};

export default QuickBiddingOffers;

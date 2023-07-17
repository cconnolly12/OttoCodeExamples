import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import animatedTYStyles from './animated.module.css';
import SingleOffer from './SingleOffer';
import updateMainStateAction from '../../../../../../../redux/Modules/Main/main.actions';
import baseURL from '../../../../../../helpers/OttoEndpoint';
import RenderMultipleType from './AnimatedMultiple/RenderMultipleType';

export default function (props) {
  const {
    source,
    type,
  } = props;
  const {
    thankYouListing,
    leaveBehindListing,
    affid,
    uuid,
    siteID,
    query,
    vertical,
  } = useSelector((state) => state.main);
  const PetTYListing = localStorage.getItem('TYlisting')
    ? JSON.parse(localStorage.getItem('TYlisting'))
    : thankYouListing;
  // eslint-disable-next-line
  const offers = useMemo(() => {
    if ((source || '').toLowerCase() === 'lb') {
      return leaveBehindListing;
    }
    if (vertical === 'Pet') {
      return PetTYListing;
    }
    return thankYouListing;
  }, [source, leaveBehindListing, thankYouListing, vertical]);
  const secondaryAds = useMemo(() => (offers.filter((ads, i) => i !== 0)), [offers]);
  const dispatch = useDispatch();

  const logClick = async (event, ad) => {
    if (event && event.preventDefault && typeof event.preventDefault === 'function' && (type.indexOf('multiple') !== -1)) {
      event.preventDefault();
    }
    await fetch(
      `${baseURL()}/api/v2/external/ty_log.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          params: {
            action: 'logRevenue',
            affid,
            uuid,
            s5: query?.s5 || '',
            publisherRevenue: ad.publisherRevenue,
            adCreativeId: ad.adCreativeId,
            advertiserId: ad.advertiserId,
            placement_id: ad.placement_id,
            buyer: ad.buyer,
            source,
            ty_type: type,
            site_id: siteID,
          },
        }),
      },
    );
    if (window.innerWidth >= 800) {
      const win = window.open((ad.clickUrl || ad.click_url), '_blank');
      if (!win) {
        window.location.href = (ad.clickUrl || ad.click_url);
        return;
      }
      win.focus();
      if (type.indexOf('multiple') !== -1) {
        // eslint-disable-next-line max-len
        const unClickedListings = thankYouListing.filter((item) => item.placement_id !== ad.placement_id);
        if (unClickedListings.length) {
          dispatch(updateMainStateAction({ thankYouListing: unClickedListings }));
          dispatch(updateMainStateAction({ multipleAds: 'true' }));
          return;
        }
      }
      dispatch(updateMainStateAction({ tyType: 'default' }));
      dispatch(updateMainStateAction({ lbType: 'default' }));
    } else {
      window.location.href = (ad.clickUrl || ad.click_url);
    }
  };

  useEffect(() => {
    if (Object.keys(offers).length >= 1 && offers[0].impression_pixel && typeof offers[0].impression_pixel === 'string') {
      try {
        const root = document.getElementById('pixel-placeholder');
        const pixelDocument = new DOMParser().parseFromString(offers[0].impression_pixel, 'text/html');
        if (pixelDocument && pixelDocument.documentElement) {
          root.appendChild(pixelDocument.documentElement);
        }
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line
  }, []);

  return offers[0]
    ? (
      <div className={animatedTYStyles.offerContainer}>
        {(type.indexOf('multiple') !== -1) && (
          <RenderMultipleType
            type={type}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
            thankYouListing={thankYouListing}
            source={source}
          />
        )}
        {type.indexOf('multiple') === -1 && (
          <SingleOffer ad={offers[0]} logClick={(e) => logClick(e, offers[0])} />
        )}
      </div>
    )
    : false;
}

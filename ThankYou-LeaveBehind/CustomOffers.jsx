import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPixelParams, hasProperty } from '../../../../helpers/FirePixels';
import SHA256 from './SHA256';
import baseURL from '../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import classes from './Types/Bidding/bidding.module.css';
import { getVerticalFromSiteID } from '../../../../helpers/getSiteID';

function replaceTokensInLink(link, values) {
  const anchors = getPixelParams(link);
  let replaced = link;
  anchors.forEach((anchor) => {
    replaced = (hasProperty.call(values, anchor)
      || hasProperty.call(values.query, anchor))
      ? replaced.replace(`#${anchor}#`, values[anchor] || values.query[anchor]) : replaced;
  });
  return replaced;
}

const encode = function (s) {
  const e = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1) {
    e[i] = s.charCodeAt(i);
  }
  return e;
};

async function getHash(message) {
  if (!window.crypto || !window.crypto.subtle) {
    return SHA256(message);
  }
  const data = encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function CustomOffers() {
  const dispatch = useDispatch();
  const { ...mainStore } = useSelector((store) => store.main);
  const {
    customOffers, uuid, siteID, affid, variantObject,
  } = mainStore;
  const site = getVerticalFromSiteID(siteID);
  const { ...verticalStore } = useSelector((store) => store[site]);
  const { headers, ...newOffers } = customOffers;
  const loadCustomOffers = async () => {
    const hashedCode = await getHash('ty_gen_secret_code');
    const response = await fetch(
      `${baseURL()}/api/v2/external/ty.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            params: {
              site_id: siteID,
              affid,
              code: hashedCode,
              form_id: variantObject.form + variantObject.variant,
              state: verticalStore.state || mainStore.geoData.state || '',
              uuid,
            },
          },
        ),
      },
    );
    try {
      const offersData = await response.json();
      if (offersData && typeof offersData === 'object') {
        dispatch(updateMainStateAction({ customOffers: offersData }));
      }
    } catch {
      dispatch(updateMainStateAction({ customOffers: [] }));
    }
  };
  useEffect(() => {
    loadCustomOffers();
  }, []);
  const showBodyText = (bodyText) => {
    const array = bodyText.split('\\r\\n');
    return array.map((line, index) => (<li className={classes.bullet} key={`li_${index + 1}`}>{line}</li>));
  };

  const link = (offer) => replaceTokensInLink(
    offer.offer_link,
    { ...mainStore, ...verticalStore, ...verticalStore.driverState1 },
  );

  const redirectToOffer = (offer) => {
    localStorage.setItem('offerClicked', 'true');
    window.open(link(offer), '_blank');
  };

  const showOffers = (offerValues) => Object.values(offerValues).map((offer, index) => (
    <div key={`offer_${index + 1}`} className={classes.adContainer}>
      <a
        href={link(offer)}
        className={`${classes.ad} ${index < 3 ? classes.topAd : ''}`}
        onClick={() => localStorage.setItem('offerClicked', 'true')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={classes.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={offer.offer_pic} alt="offer" />
        </div>

        <div className={classes.contentSection}>
          <div className={classes.title}>
            {offer.headline}
          </div>
          <div className={classes.bullets}>
            <ul>
              {showBodyText(offer.body_text)}
            </ul>
          </div>
        </div>

        <div className={classes.ctaButtonContainer}>
          <button type="button" id="quoteButton" className={classes.ctaButton} onClick={() => redirectToOffer(offer)}>
            {offer.cta_text}
          </button>
          <div className={classes.hideMobile}>Click for free quote</div>
        </div>

      </a>
    </div>
  ));
  return (
    <div className={classes.container}>
      {showOffers(newOffers)}
    </div>
  );
}

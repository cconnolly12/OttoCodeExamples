import SingleOffer from '../SingleOffer';
import { TYBiddingAd } from '../../Bidding/BiddingOffers';

export default function Type1(
  {
    type,
    offers,
    logClick,
    secondaryAds,
  },
) {
  return (
    <>
      <SingleOffer
        ad={offers[0]}
        logClick={(event) => logClick(event, offers[0])}
        type={type}
      />
      {
        secondaryAds.map((additionalAd) => (
          <TYBiddingAd
            ad={additionalAd}
            logClick={(event) => logClick(event, additionalAd)}
            key={additionalAd.placement_id}
          />
        ))
      }
    </>
  );
}

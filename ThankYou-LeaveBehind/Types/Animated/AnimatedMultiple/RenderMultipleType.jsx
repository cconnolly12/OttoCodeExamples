import { useMemo } from 'react';
import Type1 from './Type1';
import Type2 from './Type2';
import Type3 from './Type3';
import Type4 from './Type4';
import Type5 from './Type5';

export default function RenderMultipleType(
  {
    type,
    thankYouListing,
    source,
    backUpOffer,
    offers,
    logClick,
    secondaryAds,
  },
) {
  return useMemo(() => {
    switch (type) {
      case 'animated-multiple-2':
        return (
          <Type2
            type={type}
            thankYouListing={thankYouListing}
            source={source}
            backUpOffer={backUpOffer}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
          />
        );
      case 'animated-multiple-3':
        return (
          <Type3
            type={type}
            thankYouListing={thankYouListing}
            source={source}
            backUpOffer={backUpOffer}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
          />
        );
      case 'animated-multiple-4':
        return (
          <Type4
            type={type}
            thankYouListing={thankYouListing}
            source={source}
            backUpOffer={backUpOffer}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
          />
        );
      case 'animated-multiple-5':
        return (
          <Type5
            type={type}
            thankYouListing={thankYouListing}
            source={source}
            backUpOffer={backUpOffer}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
          />
        );
      default:
        return (
          <Type1
            type={type}
            thankYouListing={thankYouListing}
            source={source}
            backUpOffer={backUpOffer}
            offers={offers}
            logClick={logClick}
            secondaryAds={secondaryAds}
          />
        );
    }
  }, [type, secondaryAds, offers, backUpOffer, source, thankYouListing]);
}

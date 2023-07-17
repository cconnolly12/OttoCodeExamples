import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { CallAnAgentDesktop } from '../callHelper';
import genericStyles from './ty-lb-components.module.css';

const conditionalLoadLogo = (brandData, returnStyleSheet) => {
  const { logo, display_name } = brandData;
  return logo ? (
    <Image
      src={logo}
      width={115}
      height={57}
      className={returnStyleSheet('logo')}
      alt={display_name}
      priority
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  ) : '';
};

function autoSavingsLogo(brandData, variantObject, inboundNumber, returnStyleSheet) {
  return (
    <>
      <div className={`col-span-2 ${returnStyleSheet('logoContainer')}`}>
        {conditionalLoadLogo(brandData, returnStyleSheet)}
      </div>
      {inboundNumber ? (
        <CallAnAgentDesktop
          spanish={variantObject.spanish}
          inboundNumber={inboundNumber}
          style={genericStyles}
          hideAgent
        />
      ) : ''}
    </>
  );
}

export default ({ returnStyleSheet }) => {
  const { brandData, variantObject, inboundNumber } = useSelector((store) => store.main);
  return (
    <div className={`${returnStyleSheet('headerContainer')} w-[100%] mx-auto flex align-center justify-center grid grid-cols-3 gap-2`}>
      {autoSavingsLogo(brandData, variantObject, inboundNumber, returnStyleSheet)}
    </div>
  );
};

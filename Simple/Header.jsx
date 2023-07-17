import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import style from './simple.module.css';
import { CallAnAgentDesktop } from '../../../Common/Components/callHelper';
import { screenSize } from '../../../../helpers/detectScreenSize';
import ottoMobileLogo from '../../../../../public/images/otto_white_font.png';
import currentPageData from '../../../../helpers/CurrentPageData';

const conditionalLoadLogo = (brandData, articlePage) => {
  const { logo, display_name } = brandData;
  const mobile = screenSize('sm');
  return (
    <Image
      src={mobile && !articlePage ? ottoMobileLogo : logo}
      width={115}
      height={mobile && !articlePage ? 46 : 57}
      className={style.logo}
      alt={display_name}
      priority
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

function headerText(spanish) {
  if (spanish) {
    return 'Obtén cotizaciones de seguro de auto rápidas y baratas con un formulario simple. ¡Las tarifas más económicas desde solo $19/mes!';
  }
  return 'Get fast, cheap car insurance quotes with one simple form. Cheapest rates from only $19/mo!';
}

function autoSavingsLogo(brandData, variantObject, inboundNumber, articlePage) {
  return (
    <>
      <div className={`col-span-2 ${style.logoContainer}`}>
        {conditionalLoadLogo(brandData, articlePage)}
        <h3 className={style.headerText}>
          {headerText(variantObject.spanish)}
        </h3>
      </div>
      <div className="flex justify-end">
        <CallAnAgentDesktop
          spanish={variantObject.spanish}
          inboundNumber={inboundNumber}
          style={style}
        />
      </div>
    </>
  );
}

export default () => {
  const { brandData, variantObject, inboundNumber } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const pageData = currentPageData(currentPage, variantObject);
  return (
    <div className={`${style.headerContainer} ${pageData.articlePage && style.articleHeaderContainer} w-[100%] mx-auto flex align-center justify-center grid grid-cols-3 gap-2`}>
      {autoSavingsLogo(brandData, variantObject, inboundNumber, pageData.articlePage)}
    </div>
  );
};

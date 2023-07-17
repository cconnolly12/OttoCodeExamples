import Image from 'next/image';
import { useSelector } from 'react-redux';
import FooterLinks from '../../../Auto/ReusedComponents/FooterLinks';
import companyAddress from '../../../../helpers/companyAddress';
import style from './ty-lb-components.module.css';
import McAfee from '../../../../../public/images/logos/McAfeeSecureLogo.jpg';
import { renderDisclaimerSP } from '../../../../helpers/disclaimer';
import StaticFooterDisclaimer from '../../Disclaimers/StaticFooterDisclaimer';
import { getCurrentYear } from '../../../../helpers/getCurrentYear';

const copyright = (brand) => (
  <div className={style.copyRight}>
    ©Copyright 2015-
    {getCurrentYear()}
    {' '}
    {brand}
    {' '}
    <span className="desktop">&nbsp;|&nbsp;</span>
    {' '}
    {companyAddress()}
  </div>
);

export default () => {
  const { brandData, variantObject } = useSelector((store) => store.main);
  const getBrand = brandData.domain.indexOf('otto') > -1 ? brandData.company_brand : brandData.display_name;
  return (
    <div className={`container mx-auto flex flex-col ${style.footerContainer}`}>
      <FooterLinks classes={style} />
      {copyright(getBrand)}
      <div className={`desktop mx-auto ${style.mcAfeeLogo}`}>
        <Image
          src={McAfee}
          width={115}
          height={54}
          alt="McAfee"
          sizes="115"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={style.disclaimer}>
        { variantObject.spanish
          ? renderDisclaimerSP(getBrand)
          : <StaticFooterDisclaimer /> }
      </div>
    </div>
  );
};

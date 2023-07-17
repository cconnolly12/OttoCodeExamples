import Image from 'next/image';
import { useSelector } from 'react-redux';
import FooterLinks from '../../ReusedComponents/FooterLinks';
import companyAddress from '../../../../helpers/companyAddress';
import style from './simple.module.css';
import McAfee from '../../../../../public/images/logos/McAfeeSecureLogo.jpg';
import { renderDisclaimer, renderDisclaimerSP } from '../../../../helpers/disclaimer';
import { getCurrentYear } from '../../../../helpers/getCurrentYear';

const copyright = (classes, brand) => (
  <div className={classes.copyRight}>
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
      {copyright(style, getBrand)}
      <div className={`desktop mx-auto ${style.mcAfeeLogo}`}>
        <Image
          src={McAfee}
          width={115}
          height={54}
          alt="McAfee"
          sizes={115}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={style.disclaimer}>
        { variantObject.spanish
          ? renderDisclaimerSP(getBrand)
          : renderDisclaimer(getBrand) }
      </div>
    </div>
  );
};

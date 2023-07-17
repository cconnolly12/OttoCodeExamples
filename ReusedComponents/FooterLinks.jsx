import { useSelector } from 'react-redux';

export default (props) => {
  const { classes } = props;
  const { brandData, variantObject, vertical } = useSelector((store) => store.main);
  return (
    <div className={classes.footerLinksContainer}>
      <a rel="noopener noreferrer" className={`${classes.footerLinks} ${classes.firstLink}`} target="_blank" href="https://ottoinsurance.com/home.html">{(variantObject.spanish && 'Inicio') || 'Home'}</a>
      <a rel="noopener noreferrer" className={classes.footerLinks} href="/about" target="_blank">{(variantObject.spanish && 'Quienes Somos') || 'About'}</a>
      { brandData && brandData.domain === 'ottoinsurance.com' && vertical === 'Auto'
      && <a rel="noopener noreferrer" className={classes.footerLinks} href="https://ottoinsurance.com/news" target="_blank">{(variantObject.spanish && 'Noticias de automóviles') || 'Auto News'}</a>}
      <a rel="noopener noreferrer" className={classes.footerLinks} href="/privacy" target="_blank">{(variantObject.spanish && 'Politica De Privacidad') || 'Privacy Policy'}</a>
      <a rel="noopener noreferrer" className={classes.footerLinks} href="/privacy#CAPrivacyRights" target="_blank">{(variantObject.spanish && 'Derechos de privacidad de CA') || 'CA Privacy Rights'}</a>
      <a rel="noopener noreferrer" className={classes.footerLinks} href="/terms" target="_blank">{(variantObject.spanish && 'Terminos De Servicio') || 'Terms'}</a>
    </div>
  );
};

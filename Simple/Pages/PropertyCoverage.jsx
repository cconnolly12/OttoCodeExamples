import Title from '../../../../Common/ReusedComponents/Title';
import { propertyCoverage } from '../../../Helpers/CoregValues';
import style from '../simple.module.css';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';

export default () => {
  const propertyPersonalCoverageList = propertyCoverage.map((option) => (
    { value: option.value, title: option.title }
  )).splice(1);
  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <ButtonContainer
        buttonsList={propertyPersonalCoverageList}
        name="propertyCoverage"
        className={style.button}
        containerClass="sm:px-[3px] grow-0 text-center max-w-[18%] basis-[18%] lg2:max-w-[25%] lg2:basis-[25%]"
        listStyle={style.listStyle}
      />
    </div>
  );
};

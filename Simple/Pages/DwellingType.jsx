import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import { dwellingOptions } from '../../../Helpers/CoregValues';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';

export default () => {
  const dwellingOptionsList = dwellingOptions().splice(1).map((option) => (
    { value: option.value, title: option.title }
  ));
  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <ButtonContainer
        buttonsList={dwellingOptionsList}
        name="dwellingType"
        className={style.button}
        containerClass="sm:px-[3px] grow-0 text-center max-w-[33%] basis-[33%] lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
      />
    </div>
  );
};

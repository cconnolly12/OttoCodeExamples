import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { renderPercentage } from '../../../../../helpers/percentageHelper';
import style from '../simple.module.css';

export default function (props) {
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const [percentage, setPercentage] = useState(variantObject.progressStart || 22);
  const pages = Object.keys(variantObject.pages);
  const currentPageIndex = pages.indexOf(currentPage);
  const previousPage = pages[currentPageIndex - 1];
  const { showPercentText } = variantObject;

  React.useEffect(() => {
    if (!!previousPage && currentPage !== previousPage && !showPercentText) {
      const newPercent = renderPercentage(currentPage, pages);
      if (!(Number.isNaN(newPercent)) && +newPercent > percentage) {
        setPercentage(newPercent);
      }
    }
    if (showPercentText) {
      const newPercent = renderPercentage(currentPage, pages);
      if (newPercent === 'Start') {
        setPercentage(1);
      } else {
        setPercentage(newPercent);
      }
    }
  }, [currentPage, previousPage, props, percentage, showPercentText]);
  return (
    <div className={style.progressContainer}>
      <div className={showPercentText ? style.showPercentTextProgress : style.progress}>
        <div className={showPercentText ? style.showPercentTextProgressBar : style.progressBar} style={{ width: `calc(${percentage}% + ${percentage > 0 ? '7px' : '0px'})` }} />
        {showPercentText
          ? (
            <div className={style.progressPercentage}>
              {percentage}
              % Complete
            </div>
          )
          : ''}
      </div>
    </div>
  );
}

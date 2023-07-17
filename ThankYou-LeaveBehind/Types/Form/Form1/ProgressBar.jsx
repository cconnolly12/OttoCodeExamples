import React from 'react';

const ProgressBar = function ({ page, classes, completedForm }) {
  return (
    <div className={classes.progressBarContainer}>
      <div className={classes.progressBarMain}>
        <div className={classes.progressBarFill} style={{ width: completedForm ? '100%' : page.percentage }} />
      </div>
      <div className={classes.progressBarText}>
        <strong>{completedForm ? '100%' : page.percentage}</strong>
        {' '}
        complete
      </div>
    </div>
  );
};
export default ProgressBar;

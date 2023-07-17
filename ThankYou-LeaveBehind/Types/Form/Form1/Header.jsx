import React from 'react';

const Header = function ({
  setClosedForm, classes, collapseForm, setCollapseForm,
}) {
  return (
    <div
      role="button"
      onClick={
        () => {
          setCollapseForm(!collapseForm);
          if (!collapseForm === false) {
            setClosedForm(false);
          }
        }
      }
      tabIndex={0}
      className={classes.headerContainer}
    >
      <div className={classes.headerTitle}>Refine Your Results:</div>
      <div className={classes.headerIcon}>
        {
          collapseForm
            ? '+'
            : '-'
        }
      </div>
    </div>
  );
};

export default Header;

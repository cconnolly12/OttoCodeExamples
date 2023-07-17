import React from 'react';
import Button from './inputs/Button';

const CreateForm = function ({ page, classes, onChange }) {
  const {
    options, type, spacing, parentSpacing, title, Override,
  } = page;
  const renderType = (option) => {
    if (type === 'button') {
      return (
        <Button
          onChange={onChange}
          spacing={spacing}
          classes={classes}
          page={page}
          {...option}
        />
      );
    }
    if (type === 'override') {
      return (
        <Override
          onChange={onChange}
          spacing={spacing}
          classes={classes}
          page={page}
          {...option}
        />
      );
    }
    return '';
  };
  return (
    <div id="dynamicLBForm" className={classes.parentFormContainer1}>
      <div className={classes.parentFormContainer2} {...parentSpacing}>
        <div className={classes.parentFormContainer3}>
          <div className={classes.questionTitle}>{title}</div>
          {options.map((option) => (
            renderType(option)
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

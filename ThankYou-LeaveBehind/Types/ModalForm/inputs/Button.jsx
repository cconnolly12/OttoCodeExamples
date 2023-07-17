import React from 'react';

const Button = function ({
  onChange, title, value, classes, spacing, page, title2, selected,
}) {
  return (
    <div {...spacing} className={classes.buttonGrid}>
      <button
        type="button"
        className={`${classes.button} ${classes[page.buttonClass] || ''} ${selected ? classes.selected : ''}`}
        onClick={() => onChange(value)}
      >
        {title}
        {title2 ? (
          <>
            <br />
            {title2}
          </>
        ) : ''}
      </button>
    </div>
  );
};

export default Button;

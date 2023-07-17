import React, { useEffect, useState } from 'react';
import Button from '../inputs/Button';

const defaultOptions = [
  { title: 'Yes', value: '1' },
  { title: 'No', value: '0' },
];

const TicketsOrDUIPage = function ({ page, classes, onChange }) {
  const { spacing } = page;
  const [tickets, setTickets] = useState(undefined);
  const [DUI, setDUI] = useState(undefined);

  useEffect(() => {
    if (DUI !== undefined && tickets !== undefined) {
      onChange({ DUI, tickets });
    }
  }, [DUI, tickets, onChange]);

  return (
    <div className={classes.parentFormContainer2}>
      <div className={classes.parentFormContainer3}>
        <div className={classes.parentFormContainer2}>
          <div>
            <div className={classes.questionTitle2}>Tickets/Accidents?</div>
            {defaultOptions.map((option) => (
              <Button
                onChange={(value) => setTickets(value)}
                spacing={spacing}
                classes={classes}
                page={page}
                key={option.value}
                selected={option.value === tickets}
                {...option}
              />
            ))}
          </div>
        </div>
        <div className={classes.parentFormContainer2}>
          <div>
            <div className={classes.questionTitle2}>DUIs?</div>
            {defaultOptions.map((option) => (
              <Button
                onChange={(value) => setDUI(value)}
                spacing={spacing}
                classes={classes}
                page={page}
                key={option.value}
                selected={option.value === DUI}
                {...option}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsOrDUIPage;

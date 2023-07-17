import React from 'react';
import useGenericUpdate from '../../../../../ReusedComponents/useGenericUpdate';

export default (
  {
    label,
    name,
    checked,
    inputContainer,
    customCallback,
    classes,
    transition = false,
  },
) => {
  const genericUpdate = useGenericUpdate();
  return (
    <div className={inputContainer}>
      <div className={`form-check ${classes.checkboxContainer}`}>
        <input
          className={`
          form-check-input
          appearance-none
          h-4
          w-4
          border
          border-gray-300
          rounded-sm
          bg-white
          checked:bg-blue-600
          checked:border-blue-600
          focus:outline-none
          transition
          duration-200
          mt-1
          align-top
          bg-no-repeat
          bg-center
          bg-contain
          float-left
          mr-2
          cursor-pointer
          ${classes.checkedCheckmark}`}
          type="checkbox"
          value=""
          name={name}
          id={name}
          checked={checked}
          onChange={() => genericUpdate(name, !checked, transition, customCallback)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="form-check-label inline-block text-gray-800" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
};

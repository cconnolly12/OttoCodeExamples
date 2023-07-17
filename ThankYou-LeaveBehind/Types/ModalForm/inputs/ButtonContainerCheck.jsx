import React from 'react';
import Image from 'next/image';
import useGenericUpdate from '../../../../../ReusedComponents/useGenericUpdate';

export default (
  {
    buttonsList,
    overrideStyle,
    customCallback,
    listStyle,
    containerClass,
    buttonProps,
    name,
    className,
    activeClass,
    label,
    labelStyle,
    layout,
    wrapperStyle,
  },
) => {
  const genericUpdate = useGenericUpdate();
  return (
    <div className={listStyle}>
      {label ? <h2 className={labelStyle}>{label}</h2> : ''}
      <div className={`${wrapperStyle || ''}`}>
        {buttonsList.map(({
          value, title, title2, img, width, height, altText, active,
        }) => (
          <div className={containerClass}>
            <button
              type="button"
              className={`${className} ${active && activeClass}`}
              tracking-name={name || value}
              onClick={() => {
                genericUpdate(name, value, true, customCallback);
              }}
              name={name}
              key={value}
              value={value}
              style={overrideStyle}
              {...buttonProps}
            >
              {img && (
              <Image
                src={img}
                width={width}
                height={height}
                alt={altText}
                layout={layout || ''}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              )}
              <div>{title}</div>
              <div>{title2 && ' '}</div>
              <div>{title2 && title2}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

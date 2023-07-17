import React from 'react';
import Image from 'next/image';
import otto from '../../../../../public/images/Otto_car.png';

const WhatsNext = () => (
  <div className="flex flex-col justify-start items-center mx-auto my-[2rem] w-[100%]">
    <div className="flex sm:flex-wrap flex-nowrap py-[1rem] w-[1100px] max-w-[95%] bg-[#E9E9E9]">
      <div className="sm:w-[75%] sm:mx-auto">
        <Image
          src={otto}
          priority
          sizes="275"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="sm:px-[1rem] pt-[.25rem] sm:w-[100%] w-[80%]">
        <div className="mb-[1.5rem]">
          <span className="font-[1rem] font-medium">Here's what happens next:</span>
        </div>
        <div className="flex sm:flex-wrap flex-nowrap gap-[1.5rem]">
          <div className="sm:w-[100%] w-[40%]">
            <p className="text-[.8125rem] font-medium mb-[.5rem]">1. Review your matches</p>
            <span className="text-[.8125rem] font-normal">
              Based on your answers you've been matched with these insurer partners.
            </span>
          </div>
          <div className="sm:w-[100%] w-[40%]">
            <p className="text-[.8125rem] font-medium mb-[.5rem]">2. Get your quote</p>
            <span className="text-[.8125rem] font-normal">
              Select one and we’ll share your answers and pre-fill some of your
              info on their site so you can get your personalized quote.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WhatsNext;

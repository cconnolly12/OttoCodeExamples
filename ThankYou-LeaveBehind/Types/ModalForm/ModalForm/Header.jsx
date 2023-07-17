import React from 'react';
import Image from 'next/image';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import ottoCar from '../../../../../../../../public/images/Otto_Background.png';

const Header = function ({
  setShowModal, style, setShowForm,
}) {
  return (
    <>
      <div className={style.header}>
        <Image
          src={ottoCar}
          width={115}
          height={57}
          className={style.ottoCar}
          alt="Otto Insurance"
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
            width: '152px',
          }}
        />
        <span className="sm:block inline-flex text-center">
          Fasten Your Seatbelt, and
          &nbsp;
          <strong>Get Ready to Save</strong>
        </span>
        <button
          type="button"
          className="absolute top-[8px] right-[8px] max-w-[20px] max-h-[20px] text-white bg-black rounded-full text-sm p-1 ml-auto inline-flex items-center"
          data-modal-hide="staticModal"
          onClick={() => {
            setShowModal(false);
            setShowForm(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={style.subheader}>
        <span className="sm:block inline-flex text-center px-[15px]">
          <strong>Get personalized rates</strong>
          &nbsp;
          from our partners by clicking the filters below:
        </span>
      </div>
    </>
  );
};

export default Header;

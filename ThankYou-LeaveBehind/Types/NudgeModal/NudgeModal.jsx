import React, { useEffect, useState } from 'react';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

const NudgeModal = function ({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(0);
  const modalClosed = closeModal >= 3;
  useEffect(() => {
    window.addEventListener('focus', () => {
      setShowModal(true);
    });
    window.addEventListener('blur', () => {
      setShowModal(true);
    });
  }, [setShowModal]);
  return (
    showModal && !modalClosed && (
      <div
        id="nudgeModal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        data-modal-placement="center"
        className="fixed top-0 left-0 right-0 z-[99999] w-full sm:p-[0] p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-modal h-full backdrop-brightness-75"
      >
        <div className="relative w-[100%] h-[100%] mx-auto flex justify-center items-center mx-auto">
          <div className="sm:h-[100vh] sm:w-[100%] w-[570px] relative bg-white shadow rounded-md sm:pt-[3rem] p-[1rem]">
            <div className="sm:h-[2rem] flex items-start justify-between mb-[1rem]">
              <button
                type="button"
                className="absolute sm:top-[3rem] top-[1rem] right-[1rem] max-w-[40px] max-h-[40px] text-black bg-transparent rounded-full p-1 ml-auto inline-flex items-center"
                data-modal-hide="nudgeModal"
                onClick={() => {
                  setShowModal(false);
                  setCloseModal(closeModal + 1);
                  localStorage.setItem('nudgeModalShown', 'true');
                }}
              >
                <CloseIcon style={{ transform: 'scale(2)' }} />
              </button>
            </div>
            <h1 className="text-[1.5rem] font-medium">We see you did not check your matches</h1>
            <h2 className="text-[.8125rem] font-normal mt-[.5rem]">We did not want you to lose out on your offers below</h2>
            <div className="sm:max-h-[400px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NudgeModal;

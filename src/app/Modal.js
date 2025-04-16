"use client";
import Calender from "./Calender";

export default function Modal({ isOpen, handleCloseModal, title, children }) {
  if (!isOpen) {
    return null;
  }

  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-background") {
      handleCloseModal();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
      onClick={handleOutsideClick}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="bg-black rounded-lg shadow-lg relative w-4/5 max-h-[90vh] overflow-auto pd-6  onClick={(e) => e.stopPropagation()}">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded z-50 "
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

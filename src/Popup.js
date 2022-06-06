import react, { useRef } from "react";

export default function ({ onSubmit, loc, setInitMarker, setIsPopUpOpen }) {
  console.log("its loc", loc);
  const inputRef = useRef();
  return (
    <div className="popup">
      <label htmlFor="description">נא להכניס תיאור:</label>
      <input ref={inputRef} type="text" id="description" />
      <button
        onClick={() => {
          onSubmit({ ...loc, description: inputRef.current.value });
          setInitMarker(false);
          setIsPopUpOpen(false);
        }}>
        שמירה
      </button>
      <button
        onClick={() => {
          setInitMarker(false);
          setIsPopUpOpen(false);
        }}>
        ביטול
      </button>
    </div>
  );
}

/* setCurrentLocation({...currentLocation, description: inputRef.current.value}) */

import React, { useEffect } from "react";
import "./map.css";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
import { formatRelative } from "date-fns";
import Popup from "./Popup";
// import "@reach/combobox/styles.css"; ///???
// import mapStyles from "./mapStyles"; //if i want another style, should add an array (9.20 video) https://snazzymaps.com/

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 32.475868,
  lng: 34.976299,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAbcbcM5EQLwwFs0dky4evlrYA45sqzDLE",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [loc, setloc] = React.useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [initMarker, setInitMarker] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMarkers([{ lat: 32.47954626708334, lng: 34.98713571001481, description: "liat" }]);
    }, 1000);
  }, []);

  // useEffect(() => {}, [selected]);
  const onMapClick = React.useCallback((event) => {
    setIsPopUpOpen(true);
    setloc({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setInitMarker(true);
    console.log("it's loc", loc);
    // setMarkers((current) => [
    //   ...current,
    //   {
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),

    //     description: "",
    //   },
    // ]);
  }, []);
  // const inputRef = React.useRef();
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // console.log(markers);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // const isMarkerClicked = () => {
  //   return (
  //     <React.Fragment>
  //       <div className="popup">
  //         <label htmlFor="description">נא להכניס תיאור:</label>
  //         <input
  //           ref={inputRef}
  //           type="text"
  //           id="description"
  //           value={description}
  //           onChange={(e) => {
  //             setDescription(e.target.value);
  //           }}
  //         />
  //         <button
  //           onClick={(event) => {
  //             setIsPopUpOpen(false);
  //           }}>
  //           שמירה
  //         </button>
  //         <p>fff</p>
  //       </div>
  //     </React.Fragment>
  //   );
  // };
  console.log("it's selected", selected);
  console.log("it's markers", markers);
  return (
    <div>
      <h2>
        Spot
        <span role="img" aria-label="spot">
          🎯
        </span>
        & Share<span>🍊</span>
      </h2>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={center} options={options} onClick={onMapClick} onLoad={onMapLoad}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{ url: "/icon.png", scaledSize: new window.google.maps.Size(30, 30), origin: new window.google.maps.Point(0, 0), anchor: new window.google.maps.Point(15, 15) }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {initMarker && (
          <Marker
            position={{ lat: loc.lat, lng: loc.lng }}
            icon={{ url: "/icon.png", scaledSize: new window.google.maps.Size(30, 30), origin: new window.google.maps.Point(0, 0), anchor: new window.google.maps.Point(15, 15) }}
            // onClick={() => {
            //   setSelected(marker);
            // }}
          />
        )}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            options={{ maxWidth: 200 }}
            onCloseClick={() => {
              setSelected(null);
            }}>
            <div>
              <h3>{selected.description}</h3>
            </div>
          </InfoWindow>
        ) : null}
        {isPopUpOpen && (
          <Popup
            setInitMarker={setInitMarker}
            setIsPopUpOpen={setIsPopUpOpen}
            loc={loc}
            onSubmit={(marker) => {
              // console.log(marker);
              setMarkers((prev) => [...prev, marker]);
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default App;

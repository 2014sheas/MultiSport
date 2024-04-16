"use client";
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  ControlPosition,
} from "@vis.gl/react-google-maps";

import MapHandler from "./map-handler";
import { CustomMapControl } from "./map-control";

const EventMap = ({ location }) => {
  const position = location.geometry.location;

  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="w-1/2 h-96">
        <Map
          defaultZoom={16}
          defaultCenter={position}
          mapId="a9dbda75f7cf88c5"
          disableDefaultUI={true}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
            {location.name}
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <div className="bg-white p-2 rounded-md shadow-md text-black">
                <h3>{location.name}</h3>
                <p className="text-black">{location.formatted_address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default EventMap;

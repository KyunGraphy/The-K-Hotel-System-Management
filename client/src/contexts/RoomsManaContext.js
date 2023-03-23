import React, { createContext, useState } from 'react';

const RoomsManaContext = createContext();

function RoomsManaProvider(props) {
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const data = 'data';

  return (
    <RoomsManaContext.Provider value={{ showRoomInfo, setShowRoomInfo, data }}>
      {props.children}
    </RoomsManaContext.Provider>
  );
}

export { RoomsManaContext, RoomsManaProvider }
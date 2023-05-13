import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
  hotelId: null,
  roomId: null,
}

export const RoomContext = createContext(INITIAL_STATE);

const RoomReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROOM":
      return {
        ...state,
        roomId: action.payload,
      }
    case "SET_HOTEL":
      return {
        hotelId: action.payload,
        roomId: null,
      }
    case "REMOVE_ROOM":
      return {
        ...state,
        roomId: null,
      }
    default:
      return state
  }
}

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE)
  console.log(state.roomId, state.hotelId)

  return (
    <RoomContext.Provider
      value={{
        roomId: state.roomId,
        hotelId: state.hotelId,
        dispatch,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
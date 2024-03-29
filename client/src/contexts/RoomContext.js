import { createContext, useReducer } from "react"

// ----------------------------------------------------------------
const INITIAL_STATE = {
  hotelId: null,
  roomId: null,
  roomSearch: "",
}

// ----------------------------------------------------------------
export const RoomContext = createContext(INITIAL_STATE);

// ----------------------------------------------------------------
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
        roomSearch: "",
      }
    case "REMOVE_ROOM":
      return {
        ...state,
        roomId: null,
      }
    case "SEARCH_ROOM":
      return {
        ...state,
        roomSearch: action.payload,
      }
    default:
      return state
  }
}

// ----------------------------------------------------------------
export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE)

  return (
    <RoomContext.Provider
      value={{
        roomId: state.roomId,
        hotelId: state.hotelId,
        roomSearch: state.roomSearch,
        dispatch,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
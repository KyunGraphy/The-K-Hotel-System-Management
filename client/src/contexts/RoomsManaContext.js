import { createContext, useReducer } from "react"

const INITIAL_STATE = {
  'Available': 0,
  'Booked': 0,
  'Using': 0,
  'CheckOut': 0,
  'Maintenance': 0,
}

export const RoomsManaContext = createContext(INITIAL_STATE)

const RoomsManaReducer = (state, action) => {
  switch (action.type) {
    case 'Available':
      return {
        ...state,
        'Available': state['Available']++
      }
    case 'Booked':
      return {
        ...state,
        'Booked': state['Booked']++
      }
    case 'Using':
      return {
        ...state,
        'Using': state['Using']++
      }
    case 'CheckOut':
      return {
        ...state,
        'CheckOut': state['CheckOut']++
      }
    case 'Maintenance':
      return {
        ...state,
        'Maintenance': state['Maintenance']++
      }
    default:
      return;
  }
}

export const RoomsManaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomsManaReducer, INITIAL_STATE);

  return (
    <RoomsManaContext.Provider
      value={{
        'Available': state.Available,
        'Booked': state.Booked,
        'Using': state.Using,
        'CheckOut': state.CheckOut,
        'Maintenance': state.Maintenance,
        dispatch
      }}
    >
      {children}
    </RoomsManaContext.Provider>
  )
}
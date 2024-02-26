import { createContext, useEffect, useReducer } from "react";

// ----------------------------------------------------------------
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  lang: 'eng',
  loading: false,
  error: null,
};

// ----------------------------------------------------------------
export const AuthContext = createContext(INITIAL_STATE);

// ----------------------------------------------------------------
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        lang: 'eng',
        loading: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        lang: action.payload.lang,
        loading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        lang: 'eng',
        loading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        user: null,
        lang: 'eng',
        loading: false,
        error: null,
      }
    case "SET_LANG":
      return {
        user: JSON.parse(localStorage.getItem("user")) || null,
        lang: action.payload,
        loading: false,
        error: null,
      }
    default:
      return state;
  }
};

// ----------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        lang: state.lang,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

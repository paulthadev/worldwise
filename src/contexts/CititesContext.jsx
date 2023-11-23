import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch API
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`);

        if (!response.ok)
          dispatch({
            type: "rejected",
            payload: "failed to fetch",
          });

        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There's an error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  // GET CITY
  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`);

      if (!response.ok)
        dispatch({
          type: "rejected",
          payload: "failed to fetch",
        });

      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There's an error loading city",
      });
    }
  }

  //  POST REQUEST TO API
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok)
        dispatch({
          type: "rejected",
          payload: "failed to fetch",
        });

      const data = await response.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There's an error loading city",
      });
    }
  }

  //  DELETE ITEM FROM API
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There's an error deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(`Cities context was used outside the cities provider`);
  return context;
}

export { CitiesProvider, useCities };

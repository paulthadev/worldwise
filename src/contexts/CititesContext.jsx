import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Fetch API
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(`${err}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // GET CITY
  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //  POST REQUEST TO API
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) throw new Error("Failed to post!");

      const data = await response.json();

      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //  DELETE ITEM FROM API
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
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

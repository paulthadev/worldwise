import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CititesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  /**
  1. Using MAP to loop over the cities array to filter unique country: 

   * Each Map() entry must have a unique key, so by passing the countries as keys, we remove any duplicates.
   * Since we use unique keys for deduplication instead of unique values with Set(), there's no need to convert to json and back, making the code a lot simpler.
   */
  const countries = [
    ...new Map(
      cities.map(({ country, emoji, id }) => [country, { country, emoji, id }])
    ).values(),
  ];

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/FakeAuthContext";

function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>

        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        <li>
          <NavLink
            className={`${isAuthenticated ? styles.extra : styles.ctaLink}`}
            to="/login"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

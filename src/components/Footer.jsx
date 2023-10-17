import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} &nbsp;
        <>
          <Link
            to="https://github.com/fadayopaul"
            target="_blank"
            className={styles.cta}
          >
            {"\u25FD"} Paul Fadayo
          </Link>
        </>
      </p>
    </footer>
  );
}

export default Footer;

/*
 *
 * <script src="https://kit.fontawesome.com/dd8a7c06d3.js" crossorigin="anonymous"></script>
 npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" dd8a7c06d3 
 *
 */

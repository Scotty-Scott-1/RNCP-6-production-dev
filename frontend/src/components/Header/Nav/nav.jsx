import { Link, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import { useAuth } from "../../../security/authContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { setAccessToken, setTempMfaToken } = useAuth();

  const handleLogout = () => {
    setAccessToken(null);
    setTempMfaToken(null);

    setTimeout(() => {
      navigate("/signin");
    }, 50);
  };



  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/campaigns" className={styles.navLink}>Campaigns</Link>
        <Link to="/mailinglists" className={styles.navLink}>Mailing Lists</Link>
        <Link to="/template" className={styles.navLink}>Templates</Link>
      <button className={styles.navLink} onClick={handleLogout}>Sign Out</button>
        <Link to="/mfa" className={styles.navLink}>MFA</Link>
      </nav>
    </div>
  );
};

export default Navbar;

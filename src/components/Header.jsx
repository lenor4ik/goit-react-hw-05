import css from "../App.module.css";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  })

const Header = () => {
  return (
    <header>
      <nav className={css.nav}>
        <NavLink className={getNavLinkClassName} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassName} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  )
};

export default Header;

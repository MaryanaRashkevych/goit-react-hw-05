import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li>
          <NavLink
            to="/"
            className={(params) => {
              return clsx(css.item, params.isActive && css.active);
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return clsx(css.item, isActive && css.active);
            }}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

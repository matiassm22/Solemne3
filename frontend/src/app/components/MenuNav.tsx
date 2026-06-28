import { NavLink } from "react-router";

interface LinkItem {
  label: string;
  path: string;
}

interface MenuNavProps {
  links: LinkItem[];
}

export function MenuNav({ links }: MenuNavProps) {
  return (
    <ul className="menu-nav">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) => `menu-link${isActive ? " activo" : ""}`}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
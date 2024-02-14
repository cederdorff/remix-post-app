import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Posts</NavLink>
      <NavLink to="/add-post">Add Post</NavLink>
    </nav>
  );
}

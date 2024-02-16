import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/add-post">Add Post</NavLink>
    </nav>
  );
}

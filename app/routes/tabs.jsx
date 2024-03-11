import { NavLink, Outlet } from "@remix-run/react";

export default function Tabs() {
  return (
    <div>
      <nav>
        <NavLink to="/tabs/tab1">Tab 1</NavLink>
        <NavLink to="/tabs/tab2">Tab 2</NavLink>
      </nav>
      <div className="page">
        <h1>This is my main tab page</h1>
        <Outlet /> {/* To render the content of the active tab */}
      </div>
    </div>
  );
}

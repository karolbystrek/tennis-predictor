import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

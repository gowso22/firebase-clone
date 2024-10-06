import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <h3>레이아웃</h3>
      <Outlet />
    </>
  );
}

export default Layout;

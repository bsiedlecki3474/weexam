import MenuDrawer from "../components/MenuDrawer";

import { Outlet } from "react-router-dom";

const DashboardLayout = props => {
  return (
    <MenuDrawer>
      <Outlet />
    </MenuDrawer>
  )
}

export default DashboardLayout;
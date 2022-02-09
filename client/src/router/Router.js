import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoginLayout, DashboardLayout } from '../layouts'
import {
  Profile,
  Users,
  Groups,
  Tests,
  AddUser,
  AddGroup,
  // AddTest
} from '../components'

import Progress from "../components/Progress";

const Router = props => {
  const { loggedIn, pending } = props;

  return pending // || pending === undefined
        ? <Progress />
        : <Routes>
        <Route path="/" element={loggedIn ? <DashboardLayout /> : <LoginLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/add" element={<AddGroup />} />
        <Route path="/tests" element={<Tests />} />
        {/* <Route path="/tests/add" element={<AddTest />} /> */}
      </Route>
    </Routes>
}

const mapStateToProps = state => {
  return {
    pending: state.auth.pending,
    loggedIn: !!state.auth.data
  }
}

export default connect(mapStateToProps)(Router);
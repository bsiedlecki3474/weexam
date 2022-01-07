import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoginLayout, DashboardLayout } from '../layouts'
import {
  Profile,
  Users
} from '../components'

import { handleVerifyUser } from "../redux/actions/auth";
import Progress from "../components/Progress";

const Router = props => {
  const { loggedIn, pending, onHandleVerifyUser } = props;

  useEffect(() => {
   onHandleVerifyUser();
  }, [])

  return pending || pending === undefined
        ? <Progress />
        : <Routes>
        <Route path="/" element={loggedIn ? <DashboardLayout /> : <LoginLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
}

const mapStateToProps = state => {
  return {
    pending: state.auth.pending,
    loggedIn: !!state.auth.data
  }
}

const mapDispatchToProps = dispatch => ({
  onHandleVerifyUser: () => dispatch(handleVerifyUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Router);
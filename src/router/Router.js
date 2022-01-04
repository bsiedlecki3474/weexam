import { Routes, Route } from "react-router-dom";
import { LoginLayout, DashboardLayout } from '../layouts'
import {
  Profile,
  Users
} from '../components'

import { connect } from "react-redux";

const Router = props => {
  const { isAuthenticated } = props;
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <LoginLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isAuthenticated: !!state.auth?.data?.token
  }
}

export default connect(mapStateToProps)(Router);
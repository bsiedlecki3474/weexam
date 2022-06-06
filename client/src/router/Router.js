import { useRoutes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { LoginLayout, DashboardLayout } from '../layouts'
import {
  Profile,
  Dashboard
} from '../components'

import {
  Users,
  AddUser,
  EditUser
} from '../components/user'

import {
  Groups,
  AddGroup,
  EditGroup
} from '../components/group'

import {
  Tests,
  AddTest,
  EditTest
} from '../components/test'

import { AssessmentManager } from "../components/assessment";

import Progress from "../components/Progress";

const Router = props => {
  const { loggedIn, isAdmin, pending } = props;

  const children = isAdmin
    ? [
      { path: '', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'users', element: <Users />, },
      { path: 'users/add', element: <AddUser /> },
      { path: 'users/:id', element: <EditUser /> },
      { path: 'groups', element: <Groups />, },
      { path: 'groups/add', element: <AddGroup /> },
      { path: 'groups/:id', element: <EditGroup /> },
      { path: 'tests', element: <Tests />, },
      { path: 'tests/add', element: <AddTest /> },
      { path: 'tests/:id', element: <EditTest /> },
      { path: 'assessments/:id', element: <AssessmentManager /> },
      { path: '*', element: <Navigate to="/" /> },
    ] : [
      { path: '', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/" /> },
    ]

  const routes = [
    {
      path: '/',
      element: loggedIn ? <DashboardLayout /> : <LoginLayout />,
      children
    },
    
  ]

  const routing = useRoutes(routes);

  // return pending ? <Progress /> : routing;

  return routing;
}

const mapStateToProps = state => {
  return {
    // pending: state.auth.pending,
    loggedIn: !!state.auth.data,
    isAdmin: ['root', 'admin'].includes(state?.auth?.data?.role)
  }
}

export default connect(mapStateToProps)(Router);
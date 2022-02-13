import { useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { connect } from "react-redux";
import { LoginLayout, DashboardLayout } from '../layouts'
import {
  Profile
} from '../components'

import {
  Users,
  AddUser
} from '../components/user'

import {
  Groups,
  AddGroup,
  EditGroup
} from '../components/group'

import {
  Tests,
  AddTest
} from '../components/test'

import Progress from "../components/Progress";

const Router = props => {
  const { loggedIn, pending } = props;

  const routes = [
    {
      path: '/',
      element: loggedIn ? <DashboardLayout /> : <LoginLayout />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'users', element: <Users />, },
        { path: 'users/add', element: <AddUser /> },
        { path: 'groups', element: <Groups />, },
        { path: 'groups/add', element: <AddGroup /> },
        { path: 'groups/:id', element: <EditGroup /> },
        { path: 'tests', element: <Tests />, },
        { path: 'tests/add', element: <AddTest /> },
      ]
    },
    
  ]

  const routing = useRoutes(routes);

  return pending ? <Progress /> : routing;
}

const mapStateToProps = state => {
  return {
    pending: state.auth.pending,
    loggedIn: !!state.auth.data
  }
}

export default connect(mapStateToProps)(Router);
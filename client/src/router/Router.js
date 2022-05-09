import { useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
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

import { StartAssessment } from "../components/assessment";

import Progress from "../components/Progress";


const Router = props => {
  const { loggedIn, pending } = props;

  const routes = [
    {
      path: '/',
      element: loggedIn ? <DashboardLayout /> : <LoginLayout />,
      children: [
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
        { path: 'assessments/:id', element: <StartAssessment /> },
      ]
    },
    
  ]

  const routing = useRoutes(routes);

  // return pending ? <Progress /> : routing;

  return routing;
}

const mapStateToProps = state => {
  return {
    // pending: state.auth.pending,
    loggedIn: !!state.auth.data
  }
}

export default connect(mapStateToProps)(Router);
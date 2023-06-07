/*  eslint-disable react/react-in-jsx-scope */
import { NavMenu } from '@components/ui/sidenav/sidenav-content.component';
import AuthLayout from '@layouts/auth/auth.layout';
import MainLayout from '@layouts/main/main.layout';
import LoginPage from '@pages/auth/login';
import TestPage from '@pages/test';
import { HiOutlineHome } from 'react-icons/hi';
import { RouteObject } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <TestPage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            index: true,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
] as RouteObject[];

export const navigations: NavMenu[] = [
  {
    key: 'portal',
    path: '',
    title: 'Portal',
    icon: null,
    type: 'title',
    children: [
      {
        key: 'dashboard',
        path: '/',
        title: 'Dashboard',
        icon: <HiOutlineHome />,
        type: 'item',
        children: [],
      },
    ],
  },
  {
    key: 'group',
    path: '',
    title: 'Group Menu',
    icon: null,
    type: 'title',
    children: [
      {
        key: 'group.one',
        path: '/',
        title: 'Group 1',
        icon: null,
        type: 'item',
        children: [],
      },
      {
        key: 'group.two',
        path: '/',
        title: 'Group 2',
        icon: null,
        type: 'item',
        children: [],
      },
    ],
  },
];

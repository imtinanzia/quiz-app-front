import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { AuthGuard, GuestGuard } from './components';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

//  * PAGES
const Main = Loadable(lazy(() => import('./views/main/index')));
const Login = Loadable(lazy(() => import('./views/login/index')));
const Signup = Loadable(lazy(() => import('./views/signup/index')));

const routes: RouteObject[] = [
    {
      path: '*',
      children: [
        {
          path: 'login',
          element: (
              <Login />
          ),
        },
        {
          path: 'signup',
          element: (
              <Signup />
          ),
        },
        {
          path: '',
          element: (
            <AuthGuard>
          <Main />
          </AuthGuard>
          ),
        },
      ],
    },


];

export default routes;

import Logo from '@theme/components/logo/logo.component';
import React from 'react';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';

const AuthLayout: React.FC = () => {
  return (
    <div className="app-layout-blank flex h-[100vh] flex-auto flex-col">
      <div className="grid h-full lg:grid-cols-3">
        <div
          className={style.cover}
          style={{
            backgroundImage: `url('/dummies/auth-cover-bg.jpg')`,
          }}
        >
          <Logo src="/dummies/logo/logo-dark-full.png" />
          <div>
            <h3 className="mb-4 text-white">Jump start your project with Elstar</h3>
            <p className="max-w-[700px] text-lg text-white opacity-80">
              Elstar comes with a complete set of UI components crafted with Tailwind CSS, it fulfilled most of the use case
              to create modern and beautiful UI and application
            </p>
          </div>
          <span className="text-white">
            Copyright &copy; {`${new Date().getFullYear()}`} <span className="font-semibold">React Admin</span>{' '}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800">
          <div className="px-8 xl:min-w-[450px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

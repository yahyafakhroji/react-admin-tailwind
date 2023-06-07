import HeaderActionToggle from '@components/ui/header/actions/header-action-toggle.component';
import Header from '@components/ui/header/header.component';
import SideNav from '@components/ui/sidenav/sidenav.component';
import useResponsive from '@hooks/useResponsive';
import React from 'react';
import { Outlet } from 'react-router-dom';

import style from './style.module.scss';

const MainLayout: React.FC = () => {
  const { larger } = useResponsive();

  return (
    <div className="app-layout-modern flex flex-auto flex-col">
      <div className="flex min-w-0 flex-auto">
        <SideNav />
        <div className={style.container}>
          <Header
            className="border-b border-gray-200 dark:border-gray-700"
            prefix={<>{larger.md && <HeaderActionToggle />}</>}
          />
          <div className="flex h-full flex-auto flex-col justify-between">
            <main className="h-full">
              <div className="page-container relative flex h-full flex-auto flex-col p-4 sm:p-6 md:px-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

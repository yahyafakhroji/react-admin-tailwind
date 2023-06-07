import Logo from '@components/ui/logo/logo.component';
import SideNavContent from '@components/ui/sidenav/sidenav-content.component';
import { NavTypes } from '@constant';
import useResponsive from '@hooks/useResponsive';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom, ThemeModeAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export interface NavMenu {
  key: string;
  path: string;
  title: string;
  icon?: any | null;
  type: NavTypes;
  children: NavMenu[];
}

const SideNav: React.FC = () => {
  const { larger } = useResponsive();
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);
  const themeMode = useAtomicValue(ThemeModeAtom);

  return (
    <>
      {larger.md && (
        <div
          className={classNames(
            'side-nav',
            `side-nav-${themeMode}`,
            sideNavCollapse ? 'side-nav-collapse' : 'side-nav-expand'
          )}
        >
          <div className="side-nav-header">
            <Logo
              src={`/dummies/logo/logo-light-${sideNavCollapse ? 'streamline' : 'full'}.png`}
              className={sideNavCollapse ? 'px-4' : 'px-6'}
            />
          </div>
          {sideNavCollapse ? (
            <SideNavContent />
          ) : (
            <div className="side-nav-content">
              <Scrollbars autoHide>
                <SideNavContent />
              </Scrollbars>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SideNav;

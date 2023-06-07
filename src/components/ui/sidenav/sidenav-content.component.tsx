import SideNavMenuGroup from '@components/ui/sidenav/menu/sidenav-menu-group.component';
import SideNavMenuSingle from '@components/ui/sidenav/menu/sidenav-menu-single.component';
import { useAtomicValue } from '@libraries/state';
import { navigations } from '@routes';
import { ThemeModeAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React from 'react';

export interface NavMenu {
  key: string;
  path: string;
  title: string;
  icon?: any | null;
  type: 'item' | 'collapse' | 'title';
  children: NavMenu[];
}

const SideNavContent: React.FC = () => {
  const themeMode = useAtomicValue(ThemeModeAtom);

  const getNavItem = (nav: NavMenu) => {
    if (nav.children.length === 0 && nav.type === 'item') {
      return (
        <SideNavMenuSingle
          key={nav.key}
          nav={nav}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('molla');
          }}
        />
      );
    }

    if (nav.type === 'title') {
      return (
        <SideNavMenuGroup label={nav.title}>
          {nav.children.length &&
            nav.children.map((child) => {
              if (child.children.length) {
                return <h2>molla</h2>;
              }

              return (
                <SideNavMenuSingle
                  key={child.key}
                  nav={child}
                  onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log('molla');
                  }}
                />
              );
            })}
        </SideNavMenuGroup>
      );
    }

    return <h2>Molla</h2>;
  };

  return (
    <nav className={classNames('menu px-4 pb-4', `menu-${themeMode}`)}>
      {navigations.map((nav: NavMenu) => {
        return <div key={nav.key}>{getNavItem(nav)}</div>;
      })}
    </nav>
  );
};

export default SideNavContent;

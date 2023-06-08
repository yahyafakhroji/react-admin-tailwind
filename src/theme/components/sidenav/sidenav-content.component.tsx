import MenuGroup from '@theme/components/menu/menu-group.component';
import SideNavMenuCollapse from '@theme/components/sidenav/menu/sidenav-menu-collapse.component';
import SideNavMenuGroup from '@theme/components/sidenav/menu/sidenav-menu-group.component';
import SideNavMenuSingle from '@theme/components/sidenav/menu/sidenav-menu-single.component';
import { NavMenu } from '@theme/components/sidenav/sidenav.component';
import { useAtomicValue } from '@libraries/state';
import { navigations } from '@routes';
import { ThemeModeAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React from 'react';

const SideNavContent: React.FC<{ onMenuItemClick?: () => void }> = ({ onMenuItemClick }) => {
  const themeMode = useAtomicValue(ThemeModeAtom);

  const handleLinkClick = () => {
    onMenuItemClick?.();
  };

  const getNavItem = (nav: NavMenu) => {
    if (nav.children.length === 0 && nav.type === 'item') {
      return <SideNavMenuSingle key={nav.key} nav={nav} onClick={handleLinkClick} />;
    }

    if (nav.children.length && nav.type === 'collapse') {
      return <SideNavMenuCollapse key={nav.key} nav={nav} onClick={handleLinkClick} />;
    }

    return (
      <SideNavMenuGroup label={nav.title}>
        {nav.children.length &&
          nav.children.map((child) => {
            if (child.children.length) {
              return (
                <MenuGroup label={nav.title}>
                  {nav.children.map((sub) => {
                    if (sub.children.length) {
                      return <SideNavMenuCollapse key={nav.key} nav={nav} onClick={handleLinkClick} />;
                    }

                    return <SideNavMenuSingle key={nav.key} nav={nav} onClick={handleLinkClick} />;
                  })}
                </MenuGroup>
              );
            }

            return <SideNavMenuSingle key={child.key} nav={child} onClick={handleLinkClick} />;
          })}
      </SideNavMenuGroup>
    );
  };

  return (
    <nav className={classNames('menu px-4 pb-4', `menu-${themeMode}`)}>
      {navigations.map((nav: NavMenu) => {
        return getNavItem(nav);
      })}
    </nav>
  );
};

SideNavContent.defaultProps = {
  onMenuItemClick: () => 0,
};

export default SideNavContent;

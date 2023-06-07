import SideNavMenuGroup from '@components/ui/sidenav/menu/sidenav-menu-group.component';
import SideNavMenuSingle from '@components/ui/sidenav/menu/sidenav-menu-single.component';
import { NavMenu } from '@components/ui/sidenav/sidenav.component';
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

    // @TODO For Collapse Menu
    if (nav.children.length && nav.type === 'collapse') {
      return <h2>Collapse</h2>;
    }

    return (
      <SideNavMenuGroup label={nav.title}>
        {nav.children.length &&
          nav.children.map((child) => {
            if (child.children.length) {
              // @TODO For Collapse Menu
              return <h2>Collapse</h2>;
            }

            return <SideNavMenuSingle key={child.key} nav={child} onClick={handleLinkClick} />;
          })}
      </SideNavMenuGroup>
    );
  };

  return (
    <nav className={classNames('menu px-4 pb-4', `menu-${themeMode}`)}>
      {navigations.map((nav: NavMenu) => {
        return <div key={nav.key}>{getNavItem(nav)}</div>;
      })}
    </nav>
  );
};

SideNavContent.defaultProps = {
  onMenuItemClick: () => 0,
};

export default SideNavContent;

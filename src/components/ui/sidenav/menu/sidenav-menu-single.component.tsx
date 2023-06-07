import MenuItem from '@components/ui/menu/menu-item.component';
import { NavMenu } from '@components/ui/sidenav/sidenav-content.component';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavMenuSingle: React.FC<{ nav: NavMenu; onClick: () => void }> = ({ nav, onClick }) => {
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);

  return (
    <MenuItem key={nav.key} onSelect={onClick} className="h-[40px]">
      <Link to={nav.path} className="flex h-full w-full items-center">
        {nav.icon && <span className="mr-2 text-2xl">{nav.icon}</span>}
        {!sideNavCollapse && <span>{nav.title}</span>}
      </Link>
    </MenuItem>
  );
};

export default SideNavMenuSingle;

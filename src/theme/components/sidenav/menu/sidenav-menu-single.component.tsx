import MenuItem from '@theme/components/menu/menu-item.component';
import { NavMenu } from '@theme/components/sidenav/sidenav.component';
import Tooltip from '@theme/components/tooltip/tooltip.component';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import React from 'react';
import { Link } from 'react-router-dom';

const Item: React.FC<{ nav: NavMenu; collapse: boolean; onClick: () => void }> = ({ nav, collapse, onClick }) => {
  return (
    <MenuItem key={nav.key} onSelect={onClick} height={40} className="mb-2">
      <Link to={nav.path} className="flex h-full w-full items-center">
        {nav.icon && <span className="mr-2 text-2xl">{nav.icon}</span>}
        {!collapse && <span>{nav.title}</span>}
      </Link>
    </MenuItem>
  );
};

const SideNavMenuSingle: React.FC<{ nav: NavMenu; onClick: () => void }> = ({ nav, onClick }) => {
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);

  return sideNavCollapse ? (
    <Tooltip title={nav.title} placement="right">
      <Item nav={nav} onClick={onClick} collapse={sideNavCollapse} />
    </Tooltip>
  ) : (
    <Item nav={nav} onClick={onClick} collapse={sideNavCollapse} />
  );
};

export default SideNavMenuSingle;

import DropdownItem from '@theme/components/dropdown/dropdown-item.component';
import Dropdown from '@theme/components/dropdown/dropdown.component';
import MenuCollapse from '@theme/components/menu/menu-collapse.component';
import MenuItem from '@theme/components/menu/menu-item.component';
import { NavMenu } from '@theme/components/sidenav/sidenav.component';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  nav: NavMenu;
  onClick: (values?: any) => void;
}

const DefaultItem: React.FC<Props> = ({ nav, onClick }) => {
  return (
    <MenuCollapse
      label={
        <>
          {nav.icon && <span className="mr-2 text-2xl">{nav.icon}</span>}
          <span>{nav.title}</span>
        </>
      }
      key={nav.key}
      eventKey={nav.key}
      expanded={false}
      className="mb-2"
      height={40}
    >
      {nav.children.map((sub) => {
        return (
          <MenuItem eventKey={sub.key} key={sub.key} height={40}>
            {sub.path ? (
              <Link className="flex h-full w-full items-center" to={sub.path} onClick={() => onClick(sub)}>
                <span>{sub.title}</span>
              </Link>
            ) : (
              <span>{sub.title}</span>
            )}
          </MenuItem>
        );
      })}
    </MenuCollapse>
  );
};

const CollapsedItem: React.FC<Props> = ({ nav, onClick }) => {
  const menuItem = (
    <MenuItem key={nav.key} eventKey={nav.key} height={40} className="mb-2">
      {nav.icon && <span className="mr-2 text-2xl">{nav.icon}</span>}
    </MenuItem>
  );

  return (
    <Dropdown trigger={['hover']} titleChildren={menuItem} placement="middle-start-top">
      {nav.children.map((sub) => (
        <DropdownItem eventKey={sub.key} key={sub.key}>
          {sub.path ? (
            <Link className="flex h-full w-full items-center" onClick={() => onClick(sub)} to={sub.path}>
              <span>{sub.title}</span>
            </Link>
          ) : (
            <span>{sub.title}</span>
          )}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

const SideNavMenuCollapse: React.FC<Props> = ({ nav, onClick }) => {
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);

  return sideNavCollapse ? <CollapsedItem nav={nav} onClick={onClick} /> : <DefaultItem nav={nav} onClick={onClick} />;
};

export default SideNavMenuCollapse;

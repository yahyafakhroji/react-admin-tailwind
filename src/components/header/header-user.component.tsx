import Avatar from '@theme/components/avatar/avatar.component';
import DropdownItem from '@theme/components/dropdown/dropdown-item.component';
import Dropdown from '@theme/components/dropdown/dropdown.component';
import style from '@theme/components/header/header.module.scss';
import classNames from 'classnames';
import React from 'react';
import { HiOutlineCog, HiOutlineUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const HeaderUser: React.FC<any> = ({ className }) => {
  const dropdownItemList = [
    {
      label: 'Profile',
      path: '/',
      icon: <HiOutlineUser />,
    },
    {
      label: 'Account Setting',
      path: '/',
      icon: <HiOutlineCog />,
    },
  ];

  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      <Avatar size={32} shape="circle" src="/dummies/thumb-10.jpg" />
      <div className="hidden md:block">
        <div className="text-xs capitalize">guest</div>
        <div className="font-bold">John Doe</div>
      </div>
    </div>
  );

  return (
    <div className={style.headerActionItem}>
      <Dropdown menuStyle={{ minWidth: 240 }} titleChildren={UserAvatar} placement="bottom-end">
        <DropdownItem variant="header">
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar shape="circle" src="/dummies/thumb-10.jpg" />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">John Doe</div>
              <div className="text-xs">john.doe@gmail.com</div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem variant="divider" />
        {dropdownItemList.map((item) => (
          <DropdownItem eventKey={item.label} key={item.label} className="mb-1">
            <Link className="flex items-center gap-2" to={item.path}>
              <span className="text-xl opacity-50">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default HeaderUser;

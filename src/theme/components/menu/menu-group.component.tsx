import { GroupContextProvider } from '@theme/contexts/menu.context';
import useUniqueId from '@theme/hooks/useUniqueId';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React from 'react';

interface Props {
  label?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
  className?: string;
  variant?: string;
}

const MenuGroup: React.FC<Props> = ({ label, children, className, variant }) => {
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);

  const menuGroupDefaultClass = 'menu-group';
  const menuGroupClass = classNames(menuGroupDefaultClass, className);

  const entityHeaderId = useUniqueId('entity-header-');

  return (
    <div className={menuGroupClass}>
      {label && !sideNavCollapse && (
        <div className={classNames('menu-title', `menu-title-${variant}`)} id={entityHeaderId}>
          {label}
        </div>
      )}
      <GroupContextProvider value>
        <ul>{children}</ul>
      </GroupContextProvider>
    </div>
  );
};

MenuGroup.defaultProps = {
  label: undefined,
  children: undefined,
  className: '',
  variant: 'light',
};

export default MenuGroup;

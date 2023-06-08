import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom, ThemeModeAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';

const SideNavMenuGroup: React.FC<{ label: string; className?: string; children?: React.ReactNode | undefined }> = ({
  label,
  className,
  children,
}) => {
  const sideCollapsed = useAtomicValue(NavCollapseAtom);
  const variant = useAtomicValue(ThemeModeAtom);

  return (
    <div className={classNames('menu-group', className)}>
      {label && !sideCollapsed && (
        <div className={classNames('menu-title', `menu-title-${variant}`)} id={nanoid()}>
          {label}
        </div>
      )}
      <ul>{children}</ul>
    </div>
  );
};

SideNavMenuGroup.defaultProps = {
  className: '',
  children: undefined,
};

export default SideNavMenuGroup;

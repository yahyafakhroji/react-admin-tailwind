import { useAtomicValue } from '@libraries/state';
import { ThemeModeAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { CSSProperties, forwardRef, Ref } from 'react';

export interface NavMenuItem {
  children?: React.ReactNode | undefined;
  onSelect?: (key?: string, event?: any) => void;
  asElement?: string | undefined;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  id?: string;
  eventKey?: string;
  variant?: string;
  style?: CSSProperties;
  height?: number;
}

const MenuItem = forwardRef(
  (
    { eventKey, children, onSelect, asElement, disabled, isActive, className, height, style, ...rest }: NavMenuItem,
    ref: Ref<HTMLElement>
  ) => {
    const themeMode = useAtomicValue(ThemeModeAtom);
    const menuClass = classNames(
      'menu-item',
      `menu-item-${themeMode}`,
      isActive && 'menu-item-active',
      disabled ? 'menu-item-disabled' : 'menu-item-hoverable',
      className
    );

    const handleOnClick = (e: any) => {
      if (typeof onSelect !== 'undefined') {
        onSelect(eventKey, e);
      }
    };

    return React.createElement(
      asElement || 'div',
      {
        key: eventKey || nanoid(),
        ref,
        className: menuClass,
        onClick: handleOnClick,
        style: { height: `${height}px`, ...style },
        ...rest,
      },
      children
    );
  }
);

MenuItem.defaultProps = {
  asElement: 'div',
  disabled: false,
  isActive: false,
  className: '',
  height: 35,
  eventKey: '',
  id: 'menu-item',
  variant: 'light',
  children: undefined,
  style: {},
  onSelect: () => 0,
};

export default MenuItem;

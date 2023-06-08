import { DropdownMenuContextProvider, useDropdownMenuContext } from '@components/ui/dropdown/context/dropdown-menu';
import DropdownItem from '@components/ui/dropdown/dropdown-item.component';
import { MenuContext, MenuContextProvider } from '@components/ui/menu/context';
import { DropdownPlacements, Triggers } from '@constant';
import { useUncertainRef } from '@helpers/util.helper';
import useUniqueId from '@hooks/useUniqueId';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import React, { CSSProperties, forwardRef, Ref, useCallback, useContext } from 'react';

interface MenuProps {
  hidden: boolean | undefined;
  activeKey: string;
  placement: DropdownPlacements;
  className: string;
  menuClass: string;
  children: React.ReactNode;
  onToggle: (values?: any, event?: any) => void;
  onSelect: (values?: any, event?: any) => void;
}

const Menu = forwardRef(
  ({ hidden, activeKey, onSelect, placement, menuClass, className, children, ...rest }: MenuProps, ref: Ref<any>) => {
    const menuRef = useUncertainRef(ref);
    const menuId = useUniqueId('menu-');
    const menuControl = useDropdownMenuContext(ref);

    const getTransform = (deg: number) => {
      const rotate = `rotateX(${deg}deg)`;
      if (placement && placement.includes('center')) {
        return `${rotate} translateX(-50%)`;
      }

      return rotate;
    };

    return (
      <MenuContextProvider
        value={{
          activeKey,
          onSelect,
        }}
      >
        <DropdownMenuContextProvider value={menuControl}>
          <AnimatePresence mode="wait">
            {!hidden && (
              <motion.ul
                id={menuId}
                ref={menuRef}
                initial={{
                  opacity: 0,
                  visibility: 'hidden',
                  transform: getTransform(40),
                }}
                animate={{
                  opacity: 1,
                  visibility: 'visible',
                  transform: getTransform(0),
                }}
                exit={{
                  opacity: 0,
                  visibility: 'hidden',
                  transform: getTransform(40),
                }}
                transition={{ duration: 0.15, type: 'tween' }}
                className={classNames(className, menuClass)}
                {...rest}
              >
                {children}
              </motion.ul>
            )}
          </AnimatePresence>
        </DropdownMenuContextProvider>
      </MenuContextProvider>
    );
  }
);

interface Props {
  id?: string;
  icon?: string | undefined;
  trigger?: Triggers;
  children?: React.ReactNode | string | undefined;
  title?: React.ReactNode | string | undefined;
  activeKey: string;
  eventKey: string;
  menuClass?: string;
  className?: string;
  hidden?: boolean;
  style?: CSSProperties;
  placement?: DropdownPlacements;
  onClick?: (values?: any, event?: any) => void;
  onSelect: (values?: any, event?: any) => void;
  onToggle?: (values?: any, event?: any) => void;
}

const DropdownMenu = forwardRef(
  (
    {
      icon,
      trigger,
      hidden,
      children,
      title,
      placement,
      menuClass,
      className,
      activeKey,
      eventKey,
      onSelect,
      onToggle,
      ...rest
    }: Props,
    ref: Ref<any>
  ) => {
    const parentMenu = useContext(MenuContext);
    const handleToggleSubmenu = useCallback(
      (_: any, e: any) => {
        onToggle?.(eventKey, e);
      },
      [eventKey, onToggle]
    );

    const handleSelectSubmenu = useCallback(
      (_: any, e: any) => {
        onSelect?.(eventKey, e);
      },
      [eventKey, onSelect]
    );

    const dropdownSubmenu = (
      <Menu
        className="dropdown-menu dropdown-submenu"
        menuClass={menuClass || ''}
        activeKey={activeKey}
        hidden={hidden}
        ref={ref}
        onSelect={handleSelectSubmenu}
        onToggle={handleToggleSubmenu}
        placement={placement || 'bottom-end'}
        {...rest}
      >
        {children}
      </Menu>
    );

    if (parentMenu) {
      return (
        <DropdownItem
          icon={icon}
          trigger={trigger}
          className={className}
          submenu={dropdownSubmenu}
          eventKey={eventKey}
          onSelect={onSelect}
        >
          {title}
        </DropdownItem>
      );
    }

    return (
      <Menu
        className={classNames('dropdown-menu', placement, className)}
        menuClass={menuClass || ''}
        activeKey={activeKey}
        hidden={hidden}
        ref={ref}
        onSelect={handleSelectSubmenu}
        onToggle={handleToggleSubmenu}
        placement={placement || 'bottom-end'}
        {...rest}
      >
        {children}
      </Menu>
    );
  }
);

DropdownMenu.defaultProps = {
  id: 'dr-menu',
  icon: undefined,
  trigger: 'click',
  children: undefined,
  title: undefined,
  style: {},
  placement: 'bottom-start',
  menuClass: '',
  className: '',
  hidden: true,
  onClick: () => 0,
  onToggle: () => 0,
};

export default DropdownMenu;

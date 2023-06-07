import DropdownContext from '@components/ui/dropdown/context/dropdown';
import DropdownMenuContext, {
  DropdownMenuContextProvider,
  useDropdownMenuContext,
} from '@components/ui/dropdown/context/dropdown-menu';
import MenuContext from '@components/ui/menu/context';
import MenuItem from '@components/ui/menu/menu-item.component';
import { DropdownVariant, Triggers } from '@constant';
import { chainedFunction, useUncertainRef } from '@helpers/util.helper';
import classNames from 'classnames';
import { isNil } from 'lodash';
import { nanoid } from 'nanoid';
import React, { CSSProperties, forwardRef, ReactElement, Ref, useCallback, useContext, useEffect, useRef } from 'react';
import { HiChevronRight } from 'react-icons/hi';

interface Props {
  icon?: string | undefined;
  trigger?: Triggers;
  asElement?: string;
  className?: string;
  children?: React.ReactNode | undefined;
  style?: CSSProperties;
  active?: boolean;
  disabled?: boolean;
  variant?: DropdownVariant;
  eventKey: string;
  submenu: ReactElement;
  onClick?: (values?: any, event?: any) => void;
  onSelect: (values?: any, event?: any) => void;
}

const DropdownItem = forwardRef(
  (
    {
      active,
      children,
      disabled,
      style,
      variant,
      eventKey,
      asElement,
      className,
      submenu,
      onClick,
      onSelect,
      ...rest
    }: Props,
    ref: Ref<any>
  ) => {
    const submenuRef = useRef();

    const dropdown = useContext(DropdownContext);
    const menu = useContext(MenuContext);
    const menuControl = useContext(DropdownMenuContext);
    const submenuControl = useDropdownMenuContext(submenuRef);

    const menuitemRef = useUncertainRef(ref);
    const menuitemId = `menu-item-${nanoid()}`;

    const { open } = submenuControl;

    const isActive =
      active ||
      (!isNil(menu?.activeKey) && menu.activeKey === eventKey) ||
      (!isNil(dropdown.activeKey) && dropdown.activeKey === eventKey);

    const openSubmenuIfExists = useCallback(() => {
      if (!submenu) {
        return;
      }

      submenuControl.openMenu();
      submenuControl.focusItemAt(0);
    }, [submenu, submenuControl]);

    const activate = useCallback(
      (e: any) => {
        onSelect?.(eventKey, e);
        menu?.onSelect?.(eventKey, e);
      },
      [eventKey, onSelect, menu]
    );

    const handleClick = useCallback(
      (e: any) => {
        if (disabled) {
          return;
        }

        if (submenu) {
          openSubmenuIfExists();
        } else {
          activate(e);
        }
      },
      [disabled, submenu, openSubmenuIfExists, activate]
    );

    const handleMouseOver = useCallback(() => {
      if (submenu) {
        submenuControl.openMenu();
      }
    }, [submenu, submenuControl]);

    const handleMouseOut = useCallback(() => {
      if (submenu) {
        submenuControl.closeMenu();
      }
    }, [submenu, submenuControl]);

    const menuitemEventHandlers = {
      onClick: chainedFunction(handleClick, onClick),
    };

    const { registerItem, unregisterItem } = menuControl;

    if (submenu) {
      Object.assign(menuitemEventHandlers, { onMouseOver: handleMouseOver, onMouseOut: handleMouseOut });
    }

    useEffect(() => {
      if (variant !== 'divider' && variant !== 'header') {
        registerItem?.(menuitemRef?.current, { disabled });
      }

      return () => {
        unregisterItem?.(menuitemId);
      };
    }, [registerItem, unregisterItem, ref, menuitemId, disabled, variant]);

    if (variant === 'divider' || variant === 'custom' || variant === 'header') {
      const handlers = variant === 'custom' ? menuitemEventHandlers : {};

      return React.createElement(
        asElement || 'li',
        {
          ref: menuitemRef,
          id: menuitemId,
          style,
          className: classNames(`menu-item-${variant}`, className),
          ...handlers,
          ...rest,
        },
        (variant === 'header' || variant === 'custom') && children
      );
    }

    const renderChildren = () => {
      if (!React.isValidElement(children)) {
        return children;
      }

      return React.cloneElement(children);
    };

    const renderSubmenu = () => {
      if (!submenu) {
        return null;
      }

      return (
        <DropdownMenuContextProvider value={submenuControl}>
          {React.cloneElement(submenu, {
            ref: submenuRef,
            hidden: !open,
          })}
        </DropdownMenuContextProvider>
      );
    };

    if (submenu) {
      return (
        <li {...rest} style={style} className="relative" {...menuitemEventHandlers}>
          <MenuItem
            asElement="div"
            ref={menuitemRef}
            id={menuitemId}
            isActive={isActive}
            eventKey={eventKey}
            variant="light"
            className={classNames('dropdown-submenu-item', className)}
          >
            <span>{children}</span>
            <HiChevronRight />
          </MenuItem>
          {renderSubmenu()}
        </li>
      );
    }

    return (
      <MenuItem
        asElement="li"
        ref={menuitemRef}
        style={style}
        isActive={isActive}
        disabled={disabled}
        eventKey={eventKey}
        variant="light"
        className={className}
        {...menuitemEventHandlers}
        {...rest}
      >
        {renderChildren()}
        {renderSubmenu()}
      </MenuItem>
    );
  }
);

DropdownItem.defaultProps = {
  icon: undefined,
  trigger: 'click',
  asElement: 'li',
  variant: 'divider',
  children: undefined,
  className: '',
  style: {},
  active: false,
  disabled: false,
  onClick: () => 0,
};

export default DropdownItem;

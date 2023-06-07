import DropdownMenu from '@components/ui/dropdown/dropdown-menu.component';
import DropdownToggle from '@components/ui/dropdown/dropdown-toggle.component';
import { DropdownPlacements, Triggers } from '@constant';
import { chainedFunction } from '@helpers/util.helper';
import useRootClose from '@hooks/useRootClose';
import useUniqueId from '@hooks/useUniqueId';
import { indexOf } from 'lodash';
import React, { CSSProperties, forwardRef, Ref, useCallback, useRef } from 'react';
import DropdownContext from './context/dropdown';
import DropdownMenuContext, { useDropdownMenuContext } from './context/dropdown-menu';

interface Props {
  trigger?: Triggers[];
  placement?: DropdownPlacements;
  menuClass?: string;
  menuStyle?: CSSProperties;
  disabled?: boolean;
  title?: string | undefined;
  titleChildren?: React.ReactNode | undefined;
  toggleClassName?: string;
  children?: React.ReactNode | undefined;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSelect?: (key?: any, event?: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (values?: any) => void;
  onContextMenu?: (values?: any) => void;
}

const Dropdown = forwardRef(
  (
    {
      trigger,
      placement,
      menuClass,
      menuStyle,
      disabled,
      title,
      titleChildren,
      toggleClassName,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onSelect,
      onOpen,
      onClose,
      onToggle,
      onContextMenu,
      ...rest
    }: Props,
    ref: Ref<any>
  ) => {
    const overlayTarget = useRef();
    const triggerTarget = useRef();

    const menuControl = useDropdownMenuContext(overlayTarget);

    const { open } = menuControl;

    const { style } = rest as any;

    const buttonId = useUniqueId('dropdown-toggle-');
    const menuId = useUniqueId('base-menu-');
    const activeKey = '';

    const handleToggle = useCallback(
      (isOpen?: boolean | undefined) => {
        const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen;
        const fn = nextOpen ? onOpen : onClose;

        fn?.();
        onToggle?.(nextOpen);

        if (nextOpen) {
          menuControl.openMenu();
        } else {
          menuControl.closeMenu();
        }
      },
      [onClose, onOpen, onToggle, open, menuControl]
    );

    const handleClick = useCallback(
      (e: any) => {
        e.preventDefault();

        if (disabled) {
          return;
        }

        handleToggle();
      },
      [disabled, handleToggle]
    );

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        handleToggle(true);
      }
    }, [disabled, handleToggle]);

    const handleMouseLeave = useCallback(() => {
      if (!disabled) {
        handleToggle(false);
      }
    }, [disabled, handleToggle]);

    const handleSelect = (eventKey: any, e: any) => {
      onSelect?.(eventKey, e);
      handleToggle(false);
    };

    useRootClose(() => handleToggle(false), {
      triggerTarget,
      overlayTarget,
      disabled: !open,
      listenEscape: false,
    });

    const dropdownProps = {
      onMouseEnter,
      onMouseLeave,
    };

    const toggleEventHandlers = { onClick, onContextMenu };

    if (indexOf(trigger, 'click') >= 0) {
      toggleEventHandlers.onClick = chainedFunction(handleClick, toggleEventHandlers.onClick);
    }

    if (indexOf(trigger, 'hover') >= 0) {
      dropdownProps.onMouseEnter = chainedFunction(handleMouseEnter, onMouseEnter);
      dropdownProps.onMouseLeave = chainedFunction(handleMouseLeave, onMouseLeave);
    }

    if (indexOf(trigger, 'context') >= 0) {
      toggleEventHandlers.onContextMenu = chainedFunction(handleClick, onContextMenu);
    }

    const toggleElement = (
      <DropdownToggle
        {...rest}
        {...toggleEventHandlers}
        id={buttonId}
        ref={triggerTarget}
        className={toggleClassName}
        titleChildren={titleChildren}
        disabled={disabled}
        placement={placement}
      >
        {title}
      </DropdownToggle>
    );

    const menuElement = (
      <DropdownMenu
        activeKey={activeKey}
        eventKey={activeKey}
        className={menuClass}
        style={menuStyle}
        onSelect={handleSelect}
        ref={overlayTarget}
        hidden={!open}
        placement={placement}
        id={menuId}
      >
        {children}
      </DropdownMenu>
    );

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <DropdownContext.Provider value={{ activeKey }}>
        <div {...dropdownProps} ref={ref} style={style} className="dropdown">
          {toggleElement}
          <DropdownMenuContext.Provider value={menuControl}>{menuElement}</DropdownMenuContext.Provider>
        </div>
      </DropdownContext.Provider>
    );
  }
);

Dropdown.defaultProps = {
  trigger: ['click'],
  placement: 'bottom-start',
  menuClass: '',
  menuStyle: {},
  disabled: false,
  title: undefined,
  titleChildren: undefined,
  toggleClassName: '',
  children: undefined,
  onClick: () => 0,
  onMouseEnter: () => 0,
  onMouseLeave: () => 0,
  onSelect: () => 0,
  onOpen: () => 0,
  onClose: () => 0,
  onToggle: () => 0,
  onContextMenu: () => 0,
};

export default Dropdown;

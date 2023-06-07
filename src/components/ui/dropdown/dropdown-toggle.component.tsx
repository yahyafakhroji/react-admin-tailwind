import { DropdownPlacements } from '@constant';
import classNames from 'classnames';
import React, { forwardRef, Ref } from 'react';
import { HiChevronDown, HiChevronLeft, HiChevronRight, HiChevronUp } from 'react-icons/hi';

const DropdownToggleDefaultContent: React.FC<{
  placement: DropdownPlacements;
  children: React.ReactNode | undefined;
}> = ({ placement, children }) => {
  // TODO: impl rtl handling
  if (placement && placement.includes('middle-start')) {
    return (
      <>
        {children}
        <HiChevronRight />
      </>
    );
  }

  if (placement && placement.includes('middle-end')) {
    return (
      <>
        <HiChevronLeft />
        {children}
      </>
    );
  }

  if (placement && placement.includes('top')) {
    return (
      <>
        {children}
        <HiChevronUp />
      </>
    );
  }

  return (
    <>
      {children}
      <HiChevronDown />
    </>
  );
};

const DropdownToggle = forwardRef(
  ({ titleChildren, className, toggleClassName, disabled, placement, children, ...rest }: any, ref: Ref<any>) => {
    const dropdownToggleClass = classNames(
      'dropdown-toggle',
      className,
      toggleClassName,
      disabled && 'dropdown-toggle-disabled'
    );

    const dropdownToggleDefaultClass = classNames(dropdownToggleClass, 'dropdown-toggle-default');

    if (titleChildren) {
      return (
        <div className={dropdownToggleClass} {...rest} ref={ref}>
          {titleChildren}
        </div>
      );
    }

    return (
      <div ref={ref} className={dropdownToggleDefaultClass} {...rest}>
        <span className="flex items-center">
          <DropdownToggleDefaultContent placement={placement}>{children}</DropdownToggleDefaultContent>
        </span>
      </div>
    );
  }
);

export default DropdownToggle;

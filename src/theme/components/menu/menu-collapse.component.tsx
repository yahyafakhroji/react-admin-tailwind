import { CollapseContextProvider } from '@theme/contexts/menu.context';
import { useAtomicValue } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

export interface NavMenuCollapse {
  label?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
  className?: string;
  defaultExpandedKeys?: string[];
  eventKey?: string;
  variant?: string;
  height?: number;
  expanded?: boolean;
  onToggle?: (isExpanded?: boolean, event?: any) => void;
}

const MenuCollapse: React.FC<NavMenuCollapse> = ({
  defaultExpandedKeys,
  variant,
  children,
  className,
  eventKey,
  expanded,
  label,
  height,
  onToggle,
}) => {
  const sideNavCollapse = useAtomicValue(NavCollapseAtom);
  const [isExpanded, setIsExpanded] = useState(expanded || false);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (eventKey && (defaultExpandedKeys || []).includes(eventKey)) {
      setIsExpanded(true);
    }

    if (expanded !== isExpanded) {
      setIsExpanded(true);
    }
  }, [expanded, onToggle, eventKey, defaultExpandedKeys]);

  const toggleCollapse = (e: any) => {
    if (typeof onToggle === 'function') {
      onToggle(!isExpanded, e);
    }

    setIsExpanded(!isExpanded);
  };

  const getChildrenHeight = () => {
    let val = 0;
    const child = children as any;

    if (isExpanded && child && child.length) {
      val = child.length * (height || 35);
    }

    if (isExpanded && child && !child.length) {
      val = height || 35;
    }

    return val;
  };

  const menuCollapseItemClass = classNames('menu-collapse-item', `menu-collapse-item-${variant}`, className);

  return (
    <div className="menu-collapse">
      <div className={menuCollapseItemClass} onClick={toggleCollapse}>
        <span className="flex items-center">{label}</span>
        <motion.span
          className="mt-1 text-lg"
          initial={{ transform: 'rotate(0deg)' }}
          animate={{
            transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)',
          }}
          transition={{ duration: 0.15 }}
        >
          {sideNavCollapse ? null : <HiChevronDown />}
        </motion.span>
      </div>

      <CollapseContextProvider value={isExpanded}>
        <motion.ul
          className="ml-5"
          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? getChildrenHeight() : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.ul>
      </CollapseContextProvider>
    </div>
  );
};

MenuCollapse.defaultProps = {
  label: undefined,
  children: undefined,
  className: '',
  defaultExpandedKeys: [],
  eventKey: '',
  variant: 'light',
  height: 35,
  expanded: false,
  onToggle: () => 0,
};

export default MenuCollapse;

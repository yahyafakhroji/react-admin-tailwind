import { useAtomic } from '@libraries/state';
import { NavCollapseAtom } from '@states/atoms/util.atom';
import classNames from 'classnames';
import React from 'react';
import { HiOutlineMenu, HiOutlineMenuAlt2 } from 'react-icons/hi';

import style from '../header.module.scss';

const HeaderActionToggle: React.FC = () => {
  const [toggled, setToggle] = useAtomic(NavCollapseAtom);

  return (
    <div
      className={classNames('text-2xl', style.headerActionItem, style.headerActionItemHoverable)}
      onClick={() => setToggle(!toggled)}
    >
      {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
    </div>
  );
};

export default HeaderActionToggle;

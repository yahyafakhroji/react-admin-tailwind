import classNames from 'classnames';
import React from 'react';
import style from './header.module.scss';

interface Props {
  className?: string;
  prefix?: React.ReactNode | undefined;
  middle?: React.ReactNode | undefined;
  suffix?: React.ReactNode | undefined;
}

const Header: React.FC<Props> = ({ className, prefix, middle, suffix }) => {
  return (
    <header className={classNames(style.header, className)}>
      <div className={style.headerWrapper}>
        {prefix && <div className={classNames(style.headerAction, 'header-action-start')}>{prefix}</div>}
        {middle && <div className={classNames(style.headerAction, 'header-action-middle')}>{middle}</div>}
        {suffix && <div className={classNames(style.headerAction, 'header-action-end')}>{suffix}</div>}
      </div>
    </header>
  );
};

Header.defaultProps = {
  className: '',
  prefix: undefined,
  middle: undefined,
  suffix: undefined,
};

export default Header;

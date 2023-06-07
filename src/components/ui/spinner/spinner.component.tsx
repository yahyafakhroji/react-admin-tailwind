import { PrimaryColorLevel, ThemeColor } from '@constant';
import classNames from 'classnames';
import React, { CSSProperties, forwardRef, Ref } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface Props {
  size?: string | number;
  color?: string | undefined;
  indicator?: any;
  isSpining?: boolean;
  enableTheme?: boolean;
  style?: CSSProperties | undefined;
  className?: string;
}

const Spinner = forwardRef(
  (
    { size, color, indicator: Component, isSpining, style, className, enableTheme, ...rest }: Props,
    ref: Ref<HTMLElement>
  ) => {
    const spinnerColor = color || (enableTheme && `${ThemeColor}-${PrimaryColorLevel}`);

    const spinnerStyle = {
      height: size,
      width: size,
      ...style,
    };

    const spinnerClass = classNames(isSpining && 'animate-spin', spinnerColor && `text-${spinnerColor}`, className);

    return <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />;
  }
);

Spinner.defaultProps = {
  enableTheme: true,
  isSpining: true,
  size: 20,
  color: undefined,
  style: {},
  className: '',
  indicator: CgSpinner,
};

export default Spinner;

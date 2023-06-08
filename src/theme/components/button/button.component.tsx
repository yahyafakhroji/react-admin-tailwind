import { ButtonShapes, ButtonVariants, ControlSizes, PrimaryColorLevel, Sizes, ThemeColor } from '@theme/constant';
import Spinner from '@theme/components/spinner/spinner.component';
import useColorLevel from '@theme/hooks/useColorLevel';
import { useForm } from '@theme/hooks/useForm';
import { useInputGroup } from '@theme/hooks/useInputGroup';
import classNames from 'classnames';
import React, { forwardRef, Ref } from 'react';

interface Props extends React.ButtonHTMLAttributes<any> {
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  shape?: ButtonShapes;
  className?: string;
  size?: Sizes;
  color?: string;
  variant?: ButtonVariants;
  icon?: React.ReactNode | string | undefined;
  children?: React.ReactNode | undefined;
}

const Button = forwardRef(
  (
    { size, active, disabled, loading, block, shape, className, color, variant, icon, children, ...rest }: Props,
    ref: Ref<any>
  ) => {
    const formControlSize = useForm()?.size;
    const inputGroupSize = useInputGroup()?.size;

    const defaultClass = 'button';
    const sizeIconClass = 'inline-flex items-center justify-center';

    const splitedColor = (color || '').split('-');

    const buttonSize = size || inputGroupSize || formControlSize || 'md';
    const buttonColor = splitedColor[0] || ThemeColor;
    const buttonColorLevel = splitedColor[1] || PrimaryColorLevel;

    const [increaseLevel, decreaseLevel] = useColorLevel(buttonColorLevel);

    const disabledClass = 'opacity-50 cursor-not-allowed';

    const getButtonSize = () => {
      let sizeClass = '';

      switch (buttonSize) {
        case 'lg':
          sizeClass = classNames(
            `h-${ControlSizes.lg}`,
            icon && !children ? `w-${ControlSizes.lg} ${sizeIconClass} text-2xl` : 'px-8 py-2 text-base'
          );
          break;
        case 'sm':
          sizeClass = classNames(
            `h-${ControlSizes.sm}`,
            icon && !children ? `w-${ControlSizes.sm} ${sizeIconClass} text-lg` : 'px-3 py-2 text-sm'
          );
          break;
        case 'xs':
          sizeClass = classNames(
            `h-${ControlSizes.xs}`,
            icon && !children ? `w-${ControlSizes.xs} ${sizeIconClass} text-base` : 'px-3 py-1 text-xs'
          );
          break;
        default:
          sizeClass = classNames(
            `h-${ControlSizes.md}`,
            icon && !children ? `w-${ControlSizes.md} ${sizeIconClass} text-xl` : 'px-8 py-2'
          );
          break;
      }

      return sizeClass;
    };

    const getButtonColor = ({ bgColor, hoverColor, activeColor, textColor }: any) => {
      return `${bgColor} ${disabled || loading ? disabledClass : `${hoverColor} ${activeColor}`} ${textColor}`;
    };

    const solidColor = () => {
      const btn = {
        bgColor: active ? `bg-${buttonColor}-${increaseLevel}` : `bg-${buttonColor}-${buttonColorLevel}`,
        textColor: 'text-white',
        hoverColor: active ? '' : `hover:bg-${buttonColor}-${decreaseLevel}`,
        activeColor: `active:bg-${buttonColor}-${increaseLevel}`,
      };

      return getButtonColor(btn);
    };

    const twoToneColor = () => {
      const btn = {
        bgColor: active
          ? `bg-${buttonColor}-200 dark:bg-${buttonColor}-50`
          : `bg-${buttonColor}-50 dark:bg-${buttonColor}-500 dark:bg-opacity-20`,
        textColor: `text-${buttonColor}-${buttonColorLevel} dark:text-${buttonColor}-50`,
        hoverColor: active ? '' : `hover:bg-${buttonColor}-100 dark:hover:bg-${buttonColor}-500 dark:hover:bg-opacity-30`,
        activeColor: `active:bg-${buttonColor}-200 dark:active:bg-${buttonColor}-500 dark:active:bg-opacity-40`,
      };

      return getButtonColor(btn);
    };

    const defaultColor = () => {
      const btn = {
        bgColor: active
          ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
          : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
        textColor: `text-gray-600 dark:text-gray-100`,
        hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
        activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
      };

      return getButtonColor(btn);
    };

    const plainColor = () => {
      const btn = {
        bgColor: active ? `bg-gray-100 dark:bg-gray-500` : 'bg-transparent border border-transparent',
        textColor: `text-gray-600 dark:text-gray-100`,
        hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
        activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
      };

      return getButtonColor(btn);
    };

    const btnColor = () => {
      switch (variant) {
        case 'solid':
          return solidColor();
        case 'twoTone':
          return twoToneColor();
        case 'plain':
          return plainColor();
        case 'default':
          return defaultColor();
        default:
          return defaultColor();
      }
    };

    const classes = classNames(
      defaultClass,
      btnColor(),
      `radius-${shape}`,
      getButtonSize(),
      className,
      block ? 'w-full' : ''
    );

    const handleClick = (e: any) => {
      const { onClick }: any = rest;

      if (disabled || loading) {
        e.preventDefault();

        return;
      }

      onClick?.(e);
    };

    const renderChildren = () => {
      if (loading && children) {
        return (
          <span className="flex items-center justify-center">
            <Spinner enableTheme={false} className="mr-1" />
            {children}
          </span>
        );
      }

      if (icon && !children && loading) {
        return <Spinner enableTheme={false} />;
      }

      if (icon && !children && !loading) {
        return <>{icon}</>;
      }

      if (icon && children && !loading) {
        return (
          <span className="flex items-center justify-center">
            <span className="text-lg">{icon}</span>
            <span className="ltr:ml-1 rtl:mr-1">{children}</span>
          </span>
        );
      }

      return <>{children}</>;
    };

    return (
      // eslint-disable-next-line react/button-has-type
      <button ref={ref} className={classes} {...rest} onClick={handleClick}>
        {renderChildren()}
      </button>
    );
  }
);

Button.defaultProps = {
  active: false,
  disabled: false,
  loading: false,
  block: false,
  shape: 'round',
  className: '',
  color: '',
  variant: 'default',
  icon: undefined,
  size: 'md',
  children: undefined,
};

export default Button;

import classNames from 'classnames';
import React from 'react';
import { BsFillCaretDownFill, BsFillCaretLeftFill, BsFillCaretRightFill, BsFillCaretUpFill } from 'react-icons/bs';

const TooltipArrow = ({ placement, color, colorDark }: any) => {
  const arrowDefaultClass = `absolute text-${color} dark:text-${colorDark}`;

  // eslint-disable-next-line consistent-return
  const getArrow = () => {
    switch (placement) {
      case 'top':
        return <BsFillCaretDownFill className={classNames(arrowDefaultClass, '-bottom-2 left-0 w-full')} />;
      case 'top-start':
        return <BsFillCaretDownFill className={classNames(arrowDefaultClass, '-bottom-2 left-0 ml-3')} />;
      case 'top-end':
        return <BsFillCaretDownFill className={classNames(arrowDefaultClass, '-bottom-2 right-0 mr-3')} />;
      case 'right':
        return (
          <BsFillCaretLeftFill className={classNames(arrowDefaultClass, '-left-2 top-1/2 -translate-y-1/2 transform')} />
        );
      case 'right-start':
        return <BsFillCaretLeftFill className={classNames(arrowDefaultClass, '-left-2 top-2')} />;
      case 'right-end':
        return <BsFillCaretLeftFill className={classNames(arrowDefaultClass, '-left-2 bottom-2')} />;
      case 'bottom':
        return <BsFillCaretUpFill className={classNames(arrowDefaultClass, '-top-2 left-0 w-full')} />;
      case 'bottom-start':
        return <BsFillCaretUpFill className={classNames(arrowDefaultClass, '-top-2 left-0 ml-3')} />;
      case 'bottom-end':
        return <BsFillCaretUpFill className={classNames(arrowDefaultClass, '-top-2 right-0 mr-3')} />;
      case 'left':
        return (
          <BsFillCaretRightFill className={classNames(arrowDefaultClass, '-right-2 top-1/2 -translate-y-1/2 transform')} />
        );
      case 'left-start':
        return <BsFillCaretRightFill className={classNames(arrowDefaultClass, '-right-2 top-2')} />;
      case 'left-end':
        return <BsFillCaretRightFill className={classNames(arrowDefaultClass, '-right-2 bottom-2')} />;
      default:
        break;
    }
  };

  return getArrow();
};

export default TooltipArrow;

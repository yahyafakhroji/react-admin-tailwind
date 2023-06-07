import { ControlSizes, FormLayout, Sizes } from '@constant';
import { useForm } from '@hooks/useForm';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import React, { forwardRef, Ref } from 'react';

interface Props {
  layout?: FormLayout;
  size?: Sizes | undefined;
  labelWidth?: string | number | undefined;
  errorMessage?: string | undefined;
  invalid?: boolean | string | undefined;
  asterisk?: boolean;
  extra?: string | React.ReactNode | undefined;
  htmlFor?: string | undefined;
  label?: string | undefined;
  labelClass?: string;
  className?: string;
  children: React.ReactNode | undefined;
}

const FormItem = forwardRef(
  (
    {
      layout,
      size,
      label,
      labelWidth,
      labelClass,
      errorMessage,
      invalid,
      asterisk,
      extra,
      htmlFor,
      className,
      children,
      ...rest
    }: Props,
    ref: Ref<any>
  ) => {
    const { style }: any = rest || {};
    const formContext = useForm();

    const formItemLabelHeight = size || formContext.size || 'md';
    const formItemLabelWidth = labelWidth || formContext.labelWidth;
    const formItemLayout = layout || formContext.layout;

    const getFormLabelLayoutClass = () => {
      switch (formItemLayout) {
        case FormLayout.HORIZONTAL:
          return label ? `h-${ControlSizes[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}` : 'ltr:pr-2 rtl:pl-2';
        case FormLayout.VERTICAL:
          return `mb-2`;
        case FormLayout.INLINE:
          return `h-${ControlSizes[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}`;
        default:
          return '';
          break;
      }
    };

    const formItemClass = classNames('form-item', formItemLayout, className, invalid ? 'invalid' : '');

    const formLabelClass = classNames('form-label', label && getFormLabelLayoutClass(), labelClass);

    const formLabelStyle = () => {
      if (formItemLayout === FormLayout.HORIZONTAL) {
        return { ...style, ...{ minWidth: formItemLabelWidth } };
      }

      return { ...style };
    };

    const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
    const exitStyle = { opacity: 0, marginTop: -10 };
    const initialStyle = exitStyle;

    return (
      <div ref={ref} className={formItemClass}>
        <label htmlFor={htmlFor} className={formLabelClass} style={formLabelStyle()}>
          {asterisk && <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>}
          {label}
          {extra && <span>{extra}</span>}
          {label && formItemLayout !== 'vertical' && ':'}
        </label>
        <div className={formItemLayout === FormLayout.HORIZONTAL ? 'relative flex w-full flex-col justify-center' : ''}>
          {children}
          <AnimatePresence mode="wait">
            {invalid && (
              <motion.div
                className="form-explain"
                initial={initialStyle}
                animate={enterStyle}
                exit={exitStyle}
                transition={{ duration: 0.15, type: 'tween' }}
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

FormItem.defaultProps = {
  layout: FormLayout.VERTICAL,
  size: 'md',
  labelWidth: 100,
  errorMessage: undefined,
  invalid: false,
  asterisk: false,
  extra: undefined,
  htmlFor: undefined,
  label: undefined,
  labelClass: '',
  className: '',
};

export default FormItem;

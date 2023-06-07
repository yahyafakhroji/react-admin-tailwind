import { ControlSizes, PrimaryColorLevel, Sizes, ThemeColor } from '@constant';
import { useForm } from '@hooks/useForm';
import { useInputGroup } from '@hooks/useInputGroup';
import classNames from 'classnames';
import { get, isEmpty, isNil, omitBy } from 'lodash';
import React, { forwardRef, Ref, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  asElement?: string;
  type?: string;
  className?: string;
  size?: Sizes | undefined;
  value?: any;
  invalid?: boolean;
  suffix?: React.ReactNode | string | undefined;
  prefix?: React.ReactNode | string | undefined;
  unstyle?: boolean;
}

const Input = forwardRef(
  (
    // eslint-disable-next-line react/prop-types
    { asElement: Component, type, className, size, value, invalid, suffix, prefix, unstyle, ...rest }: Props,
    ref: Ref<HTMLElement>
  ) => {
    const { form, field, textArea, disabled, style }: any = rest || {};

    const [prefixGutter, setPrefixGutter] = useState(0);
    const [suffixGutter, setSuffixGutter] = useState(0);

    const formControlSize = useForm()?.size;
    const inputGroupSize = useInputGroup()?.size;

    const inputSize = size || inputGroupSize || formControlSize || 'md';

    const fixControlledValue = (val: any) => {
      if (typeof val === 'undefined' || val === null) {
        return '';
      }

      return val;
    };

    const isInvalid = useMemo(() => {
      let validate = false;
      if (!isEmpty(form) && typeof form !== 'undefined' && typeof field !== 'undefined') {
        const { touched, errors } = form;
        const touchedField = get(touched, field.name);
        const errorField = get(errors, field.name);

        validate = touchedField && errorField;
      }

      if (typeof invalid === 'boolean') {
        validate = invalid;
      }

      return validate;
    }, [form, invalid, field]);

    const inputDefaultClass = 'input';
    const inputSizeClass = `input-${inputSize} h-${ControlSizes[inputSize as any]}`;
    // eslint-disable-next-line max-len
    const inputFocusClass = `focus:ring-${ThemeColor}-${PrimaryColorLevel} focus-within:ring-${ThemeColor}-${PrimaryColorLevel} focus-within:border-${ThemeColor}-${PrimaryColorLevel} focus:border-${ThemeColor}-${PrimaryColorLevel}`;
    const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`;
    const inputClass = classNames(
      inputDefaultClass,
      !textArea && inputSizeClass,
      !isInvalid && inputFocusClass,
      !prefix && !suffix ? className : '',
      disabled && 'input-disabled',
      isInvalid && 'input-invalid',
      textArea && 'input-textarea'
    );

    const prefixNode = useRef<any>();
    const suffixNode = useRef<any>();

    const getAffixSize = () => {
      if (!prefixNode.current && !suffixNode.current) {
        return;
      }

      const prefixNodeWidth = prefixNode?.current?.offsetWidth;
      const suffixNodeWidth = suffixNode?.current?.offsetWidth;

      if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
        return;
      }

      if (prefixNodeWidth) {
        setPrefixGutter(prefixNodeWidth);
      }

      if (suffixNodeWidth) {
        setSuffixGutter(suffixNodeWidth);
      }
    };

    useEffect(() => {
      getAffixSize();
    }, [prefix, suffix]);

    const remToPxConvertion = (pixel: number) => 0.0625 * pixel;

    const affixGutterStyle = () => {
      const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
      const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
      const gutterStyle: any = {};

      if (prefix) {
        gutterStyle.paddingLeft = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingRight = rightGutter;
      }

      return gutterStyle;
    };

    const inputProps = {
      className: !unstyle ? inputClass : '',
      disabled,
      type,
      ref,
      ...field,
      ...omitBy(rest, 'defaultValue'),
    };

    if (value) {
      Object.assign(inputProps, { value: fixControlledValue(value) });
    }

    const renderTextArea = <textarea style={style} {...inputProps} />;

    const renderInput = Component ? <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} /> : '';

    const renderAffixInput = (
      <span className={inputWrapperClass}>
        {prefix ? (
          <div
            className="input-suffix-start"
            ref={(node) => {
              if (prefixNode) {
                prefixNode.current = node;
              }

              return node;
            }}
          >
            {' '}
            {prefix}{' '}
          </div>
        ) : null}
        {renderInput}
        {suffix ? (
          <div
            className="input-suffix-end"
            ref={(node) => {
              if (suffixNode) {
                suffixNode.current = node;
              }

              return node;
            }}
          >
            {suffix}
          </div>
        ) : null}
      </span>
    );

    const renderChildren = () => {
      if (textArea) {
        return renderTextArea;
      }

      if (prefix || suffix) {
        return renderAffixInput;
      }

      return renderInput;
    };

    return renderChildren();
  }
);

Input.defaultProps = {
  type: 'text',
  asElement: 'input',
  className: '',
  size: 'md',
  unstyle: false,
  invalid: false,
  suffix: undefined,
  prefix: undefined,
  value: undefined,
};

export default Input;

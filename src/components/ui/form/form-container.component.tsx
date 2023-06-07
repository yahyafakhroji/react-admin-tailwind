import { FormLayout, Sizes } from '@constant';
import { FormContextConsumer, FormContextProvider } from '@hooks/useForm';
import classNames from 'classnames';
import React from 'react';

interface Props {
  layout?: FormLayout;
  size?: Sizes;
  labelWidth?: string | number;
  className?: string;
  children: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({ layout, size, labelWidth, children, className }) => {
  const contextValue = {
    labelWidth,
    layout,
    size: size || 'md',
  };

  return (
    <FormContextProvider value={contextValue}>
      <FormContextConsumer>
        {(context) => {
          return <div className={classNames('form-container', context.layout, className)}>{children}</div>;
        }}
      </FormContextConsumer>
    </FormContextProvider>
  );
};

FormContainer.defaultProps = {
  layout: FormLayout.VERTICAL,
  size: 'md',
  labelWidth: 100,
  className: '',
};

export default FormContainer;

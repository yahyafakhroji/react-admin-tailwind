import { FormLayout, Sizes } from '@theme/constant';
import { createContext, useContext } from 'react';

interface Props {
  layout?: FormLayout;
  size?: Sizes;
  labelWidth?: string | number;
}

const FormContext = createContext({ size: 'md', labelWidth: 100, layout: FormLayout.VERTICAL } as Props);

export const FormContextProvider = FormContext.Provider;

export const FormContextConsumer = FormContext.Consumer;

export function useForm() {
  return useContext(FormContext);
}

export default FormContext;

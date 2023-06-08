import Button from '@theme/components/button/button.component';
import FormContainer from '@theme/components/form/form-container.component';
import FormItem from '@theme/components/form/form-item.component';
import Input from '@theme/components/input/input.component';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const LoginPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password'),
  });

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">Welcome back!</h3>
        <p>Please enter your credentials to sign in!</p>
      </div>
      <Formik
        initialValues={{
          username: 'admin',
          password: '123Qwe',
          rememberMe: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-console
          console.log(values);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem label="User Name" invalid={errors.username && touched.username} errorMessage={errors.username}>
                <Field type="text" autoComplete="off" name="username" placeholder="User Name" component={Input} />
              </FormItem>
              <Button type="submit" block loading={isSubmitting} variant="solid">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;

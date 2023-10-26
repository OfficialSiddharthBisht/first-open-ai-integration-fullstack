import React,{useEffect} from 'react';
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  useEffect(() => {
    if (localStorage.getItem("accessToken", null) !== null && localStorage.getItem("accessToken", null) !== undefined) {
      window.open("/", "_self");
    }
  }, []);
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:3005/api/v1/login', values);
      console.log('Login Successful:', response.data);
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login Successful")
      window.open("/", "_self");
      // You can add redirection or other logic here after a successful login.
    } catch (error) {
      console.error('Login Error:', error);
      actions.setFieldError('email', 'Invalid email or password');
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Stack spacing={4} maxW="md" mx="auto">
          <Heading as="h2" size="lg">Log In</Heading>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="email">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="youremail@example.com" />
                    <ErrorMessage name="email" component={Text} color="red.500" />
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} type="password" id="password" placeholder="Password" />
                    <ErrorMessage name="password" component={Text} color="red.500" />
                  </FormControl>
                )}
              </Field>

              <Button type="submit" colorScheme="teal" mt={4}>
                Log In
              </Button>

              {/* Display a message in case of a login error */}
              <ErrorMessage name="email">
                {(message) => (
                  <Alert status="error" mt={4}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
              </ErrorMessage>
            </Form>
          </Formik>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;

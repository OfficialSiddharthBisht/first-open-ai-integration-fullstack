import React, {useEffect} from 'react';
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignupPage = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:3005/api/v1/register', values);
      console.log('Signup Successful:', response.data);
      alert("Sign Up Successful");
      window.open("/login", "_self");
      // You can add redirection or other logic here after a successful signup.
    } catch (error) {
      console.error('Signup Error:', error);
      actions.setFieldError('email', 'Email is already in use');
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken", null) !== null && localStorage.getItem("accessToken", null) !== undefined) {
      window.open("/login", "_self");
    }
  }, []);
  return (
    <ChakraProvider>
      <Box p={4}>
        <Stack spacing={4} maxW="md" mx="auto">
          <Heading as="h2" size="lg">Sign Up</Heading>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="name">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Your Name" />
                    <ErrorMessage name="name" component={Text} color="red.500" />
                  </FormControl>
                )}
              </Field>

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
                Sign Up
              </Button>

              {/* Display a message in case of a signup error */}
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

export default SignupPage;

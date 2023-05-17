import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createUsers } from 'apiSdk/users';
import { Error } from 'components/error';
import { UsersInterface } from 'interfaces/users';
import { AsyncSelect } from 'components/async-select';

function UsersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UsersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUsers(values);
      resetForm();
      router.push('/users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UsersInterface>({
    initialValues: {
      role: '',
    },
    validationSchema: yup.object().shape({
      role: yup.string().required(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Users
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="role" mb="4" isInvalid={!!formik.errors.role}>
            <FormLabel>Role</FormLabel>
            <Input type="text" name="role" value={formik.values.role} onChange={formik.handleChange} />
            {formik.errors.role && <FormErrorMessage>{formik.errors.role}</FormErrorMessage>}
          </FormControl>

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default UsersCreatePage;

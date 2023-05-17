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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getUsersById, updateUsersById } from 'apiSdk/users';
import { Error } from 'components/error';
import { UsersInterface } from 'interfaces/users';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';

function UsersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UsersInterface>(id, getUsersById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UsersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUsersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/users');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UsersInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      role: yup.string().required(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Users
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default UsersEditPage;

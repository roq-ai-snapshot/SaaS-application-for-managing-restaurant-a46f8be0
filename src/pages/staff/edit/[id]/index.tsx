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
import { getStaffById, updateStaffById } from 'apiSdk/staff';
import { Error } from 'components/error';
import { StaffInterface } from 'interfaces/staff';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function StaffEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<StaffInterface>(id, getStaffById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: StaffInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateStaffById(id, values);
      mutate(updated);
      resetForm();
      router.push('/staff');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<StaffInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      role: yup.string().required(),
      user_id: yup.string(),
      restaurant_id: yup.string(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Staff
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
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'user_id'}
              label={'Users'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurants'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default StaffEditPage;

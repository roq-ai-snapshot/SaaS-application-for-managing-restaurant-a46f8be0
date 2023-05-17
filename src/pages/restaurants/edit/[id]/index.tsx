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
import { getRestaurantsById, updateRestaurantsById } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantsInterface } from 'interfaces/restaurants';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { UsersInterface } from 'interfaces/users';
import { getUsers } from 'apiSdk/users';

function RestaurantsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RestaurantsInterface>(id, getRestaurantsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RestaurantsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRestaurantsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/restaurants');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RestaurantsInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      location: yup.string().required(),
      description: yup.string(),
      owner_id: yup.string(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Restaurants
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="location" mb="4" isInvalid={!!formik.errors.location}>
              <FormLabel>Location</FormLabel>
              <Input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} />
              {formik.errors.location && <FormErrorMessage>{formik.errors.location}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors.description}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'owner_id'}
              label={'Users'}
              placeholder={'Select Users'}
              fetcher={getUsers}
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

export default RestaurantsEditPage;

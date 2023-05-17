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
import { getOrdersById, updateOrdersById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrdersInterface } from 'interfaces/orders';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrdersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrdersInterface>(id, getOrdersById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrdersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      status: yup.string().required(),
      total_price: yup.number().integer().required(),
      created_at: yup.date().required(),
      updated_at: yup.date().required(),
      customer_id: yup.string(),
      restaurant_id: yup.string(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors.status}</FormErrorMessage>}
            </FormControl>
            <FormControl id="total_price" mb="4" isInvalid={!!formik.errors.total_price}>
              <FormLabel>total_price</FormLabel>
              <NumberInput
                name="total_price"
                value={formik.values.total_price}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('total_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.total_price && <FormErrorMessage>{formik.errors.total_price}</FormErrorMessage>}
            </FormControl>
            <FormControl id="created_at" mb="4">
              <FormLabel>created_at</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values.created_at}
                onChange={(value: Date) => formik.setFieldValue('created_at', value)}
              />
            </FormControl>
            <FormControl id="updated_at" mb="4">
              <FormLabel>updated_at</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values.updated_at}
                onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
              />
            </FormControl>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'customer_id'}
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

export default OrdersEditPage;

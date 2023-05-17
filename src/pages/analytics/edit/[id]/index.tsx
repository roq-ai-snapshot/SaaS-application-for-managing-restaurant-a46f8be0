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
import { getAnalyticsById, updateAnalyticsById } from 'apiSdk/analytics';
import { Error } from 'components/error';
import { AnalyticsInterface } from 'interfaces/analytics';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getRestaurants } from 'apiSdk/restaurants';

function AnalyticsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AnalyticsInterface>(id, getAnalyticsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnalyticsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnalyticsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/analytics');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AnalyticsInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      report_date: yup.date().required(),
      total_orders: yup.number().integer().required(),
      total_revenue: yup.number().integer().required(),
      restaurant_id: yup.string(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Analytics
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="report_date" mb="4">
              <FormLabel>report_date</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values.report_date}
                onChange={(value: Date) => formik.setFieldValue('report_date', value)}
              />
            </FormControl>
            <FormControl id="total_orders" mb="4" isInvalid={!!formik.errors.total_orders}>
              <FormLabel>total_orders</FormLabel>
              <NumberInput
                name="total_orders"
                value={formik.values.total_orders}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('total_orders', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.total_orders && <FormErrorMessage>{formik.errors.total_orders}</FormErrorMessage>}
            </FormControl>
            <FormControl id="total_revenue" mb="4" isInvalid={!!formik.errors.total_revenue}>
              <FormLabel>total_revenue</FormLabel>
              <NumberInput
                name="total_revenue"
                value={formik.values.total_revenue}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('total_revenue', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.total_revenue && <FormErrorMessage>{formik.errors.total_revenue}</FormErrorMessage>}
            </FormControl>
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

export default AnalyticsEditPage;

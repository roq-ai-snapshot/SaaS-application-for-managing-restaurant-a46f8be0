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
import { getOrder_itemsById, updateOrder_itemsById } from 'apiSdk/order_items';
import { Error } from 'components/error';
import { Order_itemsInterface } from 'interfaces/order_items';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { OrdersInterface } from 'interfaces/orders';
import { Menu_itemsInterface } from 'interfaces/menu_items';
import { getOrders } from 'apiSdk/orders';
import { getMenu_items } from 'apiSdk/menu_items';

function Order_itemsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<Order_itemsInterface>(id, getOrder_itemsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: Order_itemsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrder_itemsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/order-items');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<Order_itemsInterface>({
    initialValues: data,
    validationSchema: yup.object().shape({
      quantity: yup.number().integer().required(),
      order_id: yup.string(),
      menu_item_id: yup.string(),
    }),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Order_items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="quantity" mb="4" isInvalid={!!formik.errors.quantity}>
              <FormLabel>quantity</FormLabel>
              <NumberInput
                name="quantity"
                value={formik.values.quantity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.quantity && <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrdersInterface>
              formik={formik}
              name={'order_id'}
              label={'Orders'}
              placeholder={'Select Orders'}
              fetcher={getOrders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<Menu_itemsInterface>
              formik={formik}
              name={'menu_item_id'}
              label={'Menu_items'}
              placeholder={'Select Menu_items'}
              fetcher={getMenu_items}
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

export default Order_itemsEditPage;

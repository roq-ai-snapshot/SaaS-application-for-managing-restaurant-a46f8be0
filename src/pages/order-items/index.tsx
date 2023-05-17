import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrder_items } from 'apiSdk/order_items';
import { Order_itemsInterface } from 'interfaces/order_items';
import { Error } from 'components/error';

function Order_itemsListPage() {
  const { data, error, isLoading } = useSWR<Order_itemsInterface[]>(() => true, getOrder_items);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order_items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Order_id</Th>
                  <Th>Menu_item_id</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.order_id}</Td>
                    <Td>{record.menu_item_id}</Td>
                    <Td>{record.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default Order_itemsListPage;

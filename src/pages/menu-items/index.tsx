import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getMenu_items } from 'apiSdk/menu_items';
import { Menu_itemsInterface } from 'interfaces/menu_items';
import { Error } from 'components/error';

function Menu_itemsListPage() {
  const { data, error, isLoading } = useSWR<Menu_itemsInterface[]>(() => true, getMenu_items);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu_items
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
                  <Th>Restaurant_id</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.description}</Td>
                    <Td>{record.price}</Td>
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
export default Menu_itemsListPage;

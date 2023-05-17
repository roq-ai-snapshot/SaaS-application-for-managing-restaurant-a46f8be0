import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getStaff } from 'apiSdk/staff';
import { StaffInterface } from 'interfaces/staff';
import { Error } from 'components/error';

function StaffListPage() {
  const { data, error, isLoading } = useSWR<StaffInterface[]>(() => true, getStaff);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Staff
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
                  <Th>User_id</Th>
                  <Th>Restaurant_id</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.user_id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.role}</Td>
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
export default StaffListPage;

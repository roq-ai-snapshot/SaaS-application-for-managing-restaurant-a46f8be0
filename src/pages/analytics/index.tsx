import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getAnalytics } from 'apiSdk/analytics';
import { AnalyticsInterface } from 'interfaces/analytics';
import { Error } from 'components/error';

function AnalyticsListPage() {
  const { data, error, isLoading } = useSWR<AnalyticsInterface[]>(() => true, getAnalytics);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Analytics
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
                  <Th>Report_date</Th>
                  <Th>Total_orders</Th>
                  <Th>Total_revenue</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.report_date.toDateString()}</Td>
                    <Td>{record.total_orders}</Td>
                    <Td>{record.total_revenue}</Td>
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
export default AnalyticsListPage;

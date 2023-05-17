import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getFeedbacks } from 'apiSdk/feedbacks';
import { FeedbackInterface } from 'interfaces/feedbacks';
import { Error } from 'components/error';

function FeedbackListPage() {
  const { data, error, isLoading } = useSWR<FeedbackInterface[]>(() => true, getFeedbacks);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Feedbacks
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
                  <Th>Customer_id</Th>
                  <Th>Restaurant_id</Th>
                  <Th>Rating</Th>
                  <Th>Comment</Th>
                  <Th>Created_at</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.customer_id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.rating}</Td>
                    <Td>{record.comment}</Td>
                    <Td>{record.created_at.toDateString()}</Td>
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
export default FeedbackListPage;

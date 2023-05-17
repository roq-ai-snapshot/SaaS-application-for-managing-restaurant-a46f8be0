import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import { Error } from '../error';

interface AsyncSelectPropsInterface<T> {
  formik: any;
  name: string;
  label: string;
  placeholder: string;
  fetcher: () => Promise<T[]>;
  renderOption: (record: T) => JSX.Element;
}

export function AsyncSelect<T>({
  formik,
  name,
  label,
  placeholder,
  fetcher,
  renderOption,
}: AsyncSelectPropsInterface<T>) {
  const { data, error, isLoading } = useSWR<T[]>(() => true, fetcher);
  return (
    <>
      {error && <Error error={error} />}
      <FormControl id={name} mb="4" isInvalid={!!formik.errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Select placeholder={placeholder} name={name} value={formik.values[name]} onChange={formik.handleChange}>
          {data?.map((record) => renderOption(record))}
        </Select>
        {formik.errors[name] && <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>}
      </FormControl>
    </>
  );
}

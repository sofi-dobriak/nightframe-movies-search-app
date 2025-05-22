import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface SearchFormProps {
  handleSearchSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchForm = ({ handleSearchSubmit }: SearchFormProps) => {
  const initialValues: FormValues = {
    query: '',
  };

  const handleSubmit = (values: FormValues, options: FormikHelpers<FormValues>) => {
    handleSearchSubmit(values.query);
    options.resetForm();
  };

  const applySchema = Yup.object().shape({
    query: Yup.string()
      .min(2, 'Minimum 2 chars')
      .max(20, 'Max 20 chars')
      .trim()
      .required('Please, enter your request'),
  });

  return (
    <div className='mb-5'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={applySchema}>
        <Form className='flex gap-7 mb-10  flex-col md:flex-row md:gap-2.5'>
          <div className='relative'>
            <Field
              type='text'
              name='query'
              placeholder='Search movies...'
              className='w-full md:min-w-[340px] p-3 bg-transparent rounded-md border border-white duration-300 ease-in-out hover:outline-none hover:border-[var(--hover-color)] focus:outline-none focus:border-[var(--hover-color)]'
            />
            <ErrorMessage
              name='query'
              className='text-[var(--error-color)] text-sm absolute bottom-[-22px] left-[4px]'
              component='div'
            />
          </div>
          <button
            type='submit'
            className='rounded-md border-none bg-[var(--button-bg-color)] min-w-[150px] h-[50px] duration-300 ease-in-out cursor-pointer hover:bg-[var(--hover-color)] focus:bg-[var(--hover-color)]'
          >
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;

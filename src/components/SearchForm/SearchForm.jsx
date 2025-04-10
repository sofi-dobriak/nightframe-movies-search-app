import { Field, Form, Formik } from 'formik';
import styles from './SearchForm.module.css';

const SearchForm = ({ handleSearch }) => {
    const initialValues = {
        query: '',
    };

    const handleSubmit = (values, options) => {
        console.log(values);

        if (!values.query.trim()) return;

        handleSearch(values.query);
        options.resetForm();
    };

    return (
        <div className={styles.searchFormWrapper}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field type='text' name='query' placeholder='Search movies...' />
                    <button type='submit'>Search</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SearchForm;

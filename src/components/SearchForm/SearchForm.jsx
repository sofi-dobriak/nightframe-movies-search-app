import { Field, Form, Formik } from 'formik';
import styles from './SearchForm.module.css';

const SearchForm = ({ handleSearchSubmit }) => {
    const initialValues = {
        query: '',
    };

    const handleSubmit = (values, options) => {
        if (!values.query.trim()) return;

        handleSearchSubmit(values.query);
        options.resetForm();
    };

    return (
        <div className={styles.searchFormWrapper}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className={styles.searchForm}>
                    <Field
                        type='text'
                        name='query'
                        placeholder='Search movies...'
                        className={styles.searchInput}
                    />
                    <button type='submit' className={styles.searchButton}>
                        Search
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default SearchForm;

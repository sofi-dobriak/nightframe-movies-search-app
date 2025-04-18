import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './SearchForm.module.css';
import * as Yup from 'yup';

const SearchForm = ({ handleSearchSubmit }) => {
    const initialValues = {
        query: '',
    };

    const handleSubmit = (values, options) => {
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
        <div className={styles.searchFormWrapper}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={applySchema}
            >
                <Form className={styles.searchForm}>
                    <div className={styles.inputWrapper}>
                        <Field
                            type='text'
                            name='query'
                            placeholder='Search movies...'
                            className={styles.searchInput}
                        />
                        <ErrorMessage name='query' className={styles.error} component='div' />
                    </div>
                    <button type='submit' className={styles.searchButton}>
                        Search
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default SearchForm;

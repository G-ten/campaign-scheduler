import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { loginUser } from '../api/api';
import { AuthContext, useAuth } from '../context/AuthContext';

const Login = () => {

    const { login } = useAuth(AuthContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password too short")
            .required("Password is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await loginUser(values);
            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                login(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
        setSubmitting(false);
    }

    return (
        <div className='container vh-100 d-flex align-items-center justify-content-center'>
            <div className='col-4 border p-4'>
                <h3 className='text-center mb-4 py-3'>Login</h3>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <div className='mb-2'>
                                <label htmlFor="emailaddress">Email</label>
                                <Field
                                    id="emailaddress"
                                    name="email"
                                    type="email"
                                    className="form-control mb-4"
                                    placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-font" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="password">Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control mb-4"
                                    placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error-font" />
                            </div>
                            <div className='pt-3 d-flex align-items-center justify-content-between'>
                                <Link to={'/signup'} className='btn btn-outline-primary'>Sign up</Link>
                                <button type="submit" disabled={isSubmitting} className='btn btn-primary'>{isSubmitting ? "submitting" : "submit"}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login
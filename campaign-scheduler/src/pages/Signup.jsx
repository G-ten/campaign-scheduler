import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Signup = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password too short")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
            const response = await registerUser(values);
            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='container vh-100 d-flex align-items-center justify-content-center'>
            <div className='col-4 border p-4'>
                <h3 className='text-center mb-4 py-2'>Sign up</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <div className='mb-2'>
                                <label htmlFor="email">Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="name"
                                    className="form-control mb-4"
                                    placeholder="Name" />
                                <ErrorMessage name="name" component="div" className="error-font" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control mb-4"
                                    placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-font" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="password">Password</label>
                                <Field
                                    id="Password"
                                    name="password"
                                    type="password"
                                    className="form-control mb-4"
                                    placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error-font" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control mb-4"
                                    placeholder="Confirm password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error-font" />
                            </div>
                            <div className='pt-2 d-flex align-items-center justify-content-between'>
                                <Link to={'/login'} className='btn btn-outline-primary'>Login</Link>
                                <button type="submit" disabled={isSubmitting} className='btn btn-primary'>{isSubmitting ? "submitting" : "submit"}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Signup
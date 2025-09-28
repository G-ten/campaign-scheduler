import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { createCampaign } from '../api/api';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

const CreateCampaign = () => {

    const navigate = useNavigate();

    const initialValues = {
        title: "",
        message: "",
        scheduledTime: new Date(),
        recipients: [{ name: "", email: "" }],
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        message: Yup.string().required("Message is required"),
        scheduledTime: Yup.date()
            .required("Scheduled Time is required")
            .min(new Date(), "Scheduled time must be in the future"),
        recipients: Yup.array()
            .of(
                Yup.object({
                    name: Yup.string().required("Name is required"),
                    email: Yup.string()
                        .email("Invalid email")
                        .required("Email is required"),
                })
            )
            .min(1, "At least one recipient is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
            const response = await createCampaign(values);
            if (response && response.data && response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className="container my-4">
            <h3 className='mb-4 text-center'>Add Campaign</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className='col-12 col-md-8 col-lg-5 col-xxl-4 mx-auto'>
                        <div className="mb-2">
                            <label className="form-label">Title</label>
                            <Field name="title" className="form-control mb-4" />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className="error-font"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Message</label>
                            <Field
                                name="message"
                                as="textarea"
                                className="form-control mb-4"
                                rows="3"
                            />
                            <ErrorMessage
                                name="message"
                                component="div"
                                className="error-font"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Scheduled Time</label>
                            <DatePicker
                                selected={values.scheduledTime}
                                onChange={(date) => setFieldValue("scheduledTime", date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="form-control mb-4"
                            />
                            <ErrorMessage
                                name="scheduledTime"
                                component="div"
                                className="error-font"
                            />
                        </div>

                        <FieldArray name="recipients">
                            {({ push, remove }) => (
                                <div>
                                    <label className="form-label">Recipients</label>
                                    {values.recipients.map((recipient, index) => (
                                        <div
                                            key={index}
                                            className="d-flex gap-2 mb-2 align-items-start"
                                        >
                                            <div className='w-100 mb-2'>
                                                <Field
                                                    name={`recipients[${index}].name`}
                                                    placeholder="Name"
                                                    className="form-control mb-4"
                                                />
                                                <ErrorMessage
                                                    name={`recipients[${index}].name`}
                                                    component="div"
                                                    className="error-font"
                                                />
                                            </div>
                                            <div className='w-100 mb-2'>
                                                <Field
                                                    name={`recipients[${index}].email`}
                                                    placeholder="Email"
                                                    className="form-control mb-4"
                                                />
                                                <ErrorMessage
                                                    name={`recipients[${index}].email`}
                                                    component="div"
                                                    className="error-font"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-danger mb-2"
                                                onClick={() => remove(index)}
                                                disabled={index < 1}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => push({ name: "", email: "" })}
                                    >
                                        Add Recipient
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <div className='d-flex justify-content-end'>
                            <button type="submit" disabled={isSubmitting} className='btn btn-primary'>{isSubmitting ? "submitting" : "submit"}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCampaign;
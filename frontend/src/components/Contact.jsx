import { useFormik } from "formik";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
});

const Contact = () => {
    const navigate = useNavigate();
    const contactForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        
        onSubmit: async (values, { resetForm }) => {
        console.log(values);
        const res = await fetch('http://localhost:5000/contact/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-Type': 'application/json'
        }
      })
            
            
            if (true) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent Successfully",
                    text: "Thank You, will reach you soon",
                });
                navigate("/login");
            }
            resetForm();
        },
        validationSchema: ContactSchema,
    });

    return (
        <div className=" p-5 vh-100">
            <header className="bg-dark text-white w-50 rounded mx-auto shadow-lg">
                <div className="container py-3 ">
                    <h2 className="text-center display-4 fw-semibold">
                        Contact us
                    </h2>

                    
                </div>
            </header>
            
            <div className="d-flex">
                <div className="card col-6 col-md-6 w-50 mx-auto shadow-lg">
                    <div className="p-5 py-3">
                        
                        <form onSubmit={contactForm.handleSubmit}>
                            <span
                                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}>
                                {contactForm.errors.name}
                            </span>
                            
                                
                                <div className="form-floating">
                                    <input
                                        id="name"
                                        onChange={contactForm.handleChange}
                                        value={contactForm.values.name}
                                        type="text"
                                        className="form-control "
                                        placeholder="Username"
                                    />
                                    <label>Username</label>
                                </div>
                            
                            <span
                                style={{ fontSize: 10, marginLeft: "10px", color: "red" }}
                            >
                                {contactForm.errors.email}
                            </span>
                           
                                
                                <div className="form-floating">
                                    <input
                                        id="email"
                                        onChange={contactForm.handleChange}
                                        value={contactForm.values.email}
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                    <label>Email address</label>
                                </div>
                           
                            <span style={{ fontSize: 10, marginLeft: "10px", color: "red" }}>
                                {contactForm.errors.message}
                            </span>
                            <div className="form-floating">
                                <textarea
                                    id="message"
                                    className="form-control" placeholder="Type your message"
                                    onChange={contactForm.handleChange}
                                    value={contactForm.values.message}
                                />
                                <label for="message">Message</label>
                            </div>
                            <button className="col-6 text-center btn btn-primary w-100 p-2 button mx-auto d-flex justify-content-center mt-5 mb-5">
                                <h5>Submit </h5>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
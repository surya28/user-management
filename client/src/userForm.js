import React from "react";
import { Formik } from "formik";

const UserForm = ({ handleClose, setData, initialValues }) => {
  React.useEffect(() => {
    return function () {
      return null;
    };
  }, []);
  console.log(initialValues?.name);
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: initialValues?.email,
          name: initialValues?.name,
          address: initialValues?.address,
          doj: initialValues?.joining_date,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.doj) {
            errors.doj = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const payload = {
            address: values.address,
            doj: values.doj,
            email: values.email,
            name: values.name,
          };
          fetch("http://localhost:5000/api/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(payload),
          })
            .then(() => {
              resetForm();
              handleClose();
              setData();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <div style={{ display: "block", color: "#d11a2a" }}>
              {errors.name && touched.name && errors.name}
            </div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div style={{ display: "block", color: "#d11a2a" }}>
              {errors.email && touched.email && errors.email}
            </div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <div style={{ display: "block", color: "#d11a2a" }}>
              {errors.address && touched.address && errors.address}
            </div>
            <label htmlFor="doj">Date of Joining</label>
            <input
              type="date"
              name="doj"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.doj}
            />
            <div style={{ display: "block", color: "#d11a2a" }}>
              {errors.doj && touched.doj && errors.doj}
            </div>
            <div className="flex">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

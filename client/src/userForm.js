import React, { useState } from "react";

const UserForm = ({ handleClose }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    handleClose();
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date of joining</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex">
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              handleClose();
            }}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;

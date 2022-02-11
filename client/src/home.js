import React from "react";
import useApi from "./services/useAPI";
import UserForm from "./userForm";

const Modal = ({ handleClose, show, setData, initialData = {} }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <UserForm handleClose={handleClose} setData={setData} initialValues={initialData} />
      </section>
    </div>
  );
};
const Home = () => {
  const [users, setUsers] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const { loading, data, error, refetch } = useApi(
    "http://localhost:5000/api/user",
    "GET"
  );

  React.useEffect(() => {
    if (data) {
      setUsers(data?.data);
    }
  }, [data]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>An error occurred</p>;
  }

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/api/user/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    showModal();
  };

  return (
    <div className="home">
      <div>
        <h1>New Joinees list</h1>
      </div>
      <div className="btn-block">
        <button className="add" onClick={() => showModal()}>
          Add new joinee
        </button>
      </div>
      <div className="flex table-header">
        <p style={{ width: "1rem" }}>S.No</p>
        <p>Name</p>
        <p>Address</p>
        <p>Email</p>
        <p>Date of Joining</p>
        <p className="last-column">Action</p>
      </div>
      {users?.map((user, index) => (
        <div className="flex border" key={index}>
          <p style={{ width: "1rem" }}>{user?.s_no}</p>
          <p>{user?.name}</p>
          <p>{user?.address}</p>
          <p>{user?.email}</p>
          <p>{user?.joining_date}</p>
          <div className="flex">
            <button
              className="delete"
              onClick={() => {
                deleteUser(user?.s_no);
              }}
            >
              Delete
            </button>
            <button
              className="update"
              onClick={() => {
                handleUpdate(user);
              }}
            >
              Update
            </button>
          </div>
        </div>
      ))}
      <Modal
        handleClose={hideModal}
        show={show}
        setData={refetch}
        initialData={selectedUser}
      />
    </div>
  );
};

export default Home;

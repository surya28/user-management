import React from "react";
import useApi from "./services/useAPI";
import UserForm from "./userForm";

const Modal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <UserForm handleClose={handleClose} />
      </section>
    </div>
  );
};
const Home = () => {
  const [users, setUsers] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const { loading, data, error } = useApi(
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
    fetch("http://localhost:5000/api/user/delete", {
      method: "DELETE",
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home">
      <div className="btn-block">
        <button className="add" onClick={() => showModal()}>
          Add user
        </button>
      </div>
      {users?.map((user, index) => (
        <div className="flex" key={index}>
          <p>{user?.s_no}</p>
          <p>{user?.name}</p>
          <p>{user?.address}</p>
          <button className="delete" onClick={() => deleteUser(user?.s_no)}>
            Delete
          </button>
        </div>
      ))}
      <Modal handleClose={hideModal} show={show} />
    </div>
  );
};

export default Home;

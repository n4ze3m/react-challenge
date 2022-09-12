import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Update() {
  const param = useParams();
  const [error, setError] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const fetchData = () => {
    axios
      .get("http://localhost:3000/users/" + param.id)
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      })
      .catch((_) => {
        setError("Error fetching data");
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [param.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/users/" + param.id, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .then((_) => {
        setSuccess(true);
        setSuccessMessage("User updated successfully");
      })
      .catch((_) => {
        setError("Error updating data");
      });
  };

  return (
    <div>
      <h3>Update User {param.id}</h3>
      <form onSubmit={onSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{successMessage}</p>}
    </div>
  );
}

export default Update;

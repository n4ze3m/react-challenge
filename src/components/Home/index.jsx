import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((_) => {
        setLoading(false);
        setError("Error fetching data");
      });
  };

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((_) => {
        fetchData();
      })
      .catch((_) => {
        setError("Error deleting data");
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => navigate(`/update/${user.id}`)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteData(user.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;

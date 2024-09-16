import React from "react";
import axios from "axios";
function App() {
  const [formData, setFormData] = React.useState({
    name: "",
    gender: "",
    image: "",
  });
  const [displayData, setDisplayData] = React.useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFormData({ ...formData, image: file });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for FormData
        },
      })

      .catch((error) => {
        console.log("Error in post data" + error.message);
      });
    setFormData({
      name: "",
      gender: "",
      image: "",
    });
    console.log("successfully created");
  };
  const shortPoll = React.useEffect(() => {
    (async () => {
      await axios.get("http://localhost:8080").then((res) => {
        setDisplayData(res.data);
        console.log(res.data, "res.data");
      });
    })();
  }, []);
  console.log(shortPoll);
  setInterval(() => {
    console.log(1);
    // shortPoll();
  }, 2000);
  // console.log(data);
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="radio"
        name="gender"
        value="male"
        id="male"
        onChange={handleChange}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        name="gender"
        value="female"
        id="female"
        onChange={handleChange}
      />
      <label htmlFor="female">Female</label>
      <input type="file" name="image" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>

      <table>
        <tr>
          <th>name</th>
          <th>genger</th>
          <th>image</th>
        </tr>

        {displayData.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>
                <img
                  src={`http://localhost:8080/images/${item.image}`}
                  alt="pic"
                  length="100px"
                  width="100px"
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
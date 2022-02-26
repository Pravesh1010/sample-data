import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const InitialuserDetails = [
    {
      name: "Pravesh",
      gender: "Male",
      age: "25",
      city: "Arni",
    },
    {
      name: "Dhoni",
      gender: "Male",
      age: "40",
      city: "Ranchi",
    },
    {
      name: "Nadal",
      gender: "Male",
      age: "34",
      city: "Madrid",
    },
    {
      name: "Roger Federer",
      gender: "Male",
      age: "37",
      city: "swiss",
    },
  ];

  const [userDetails, setUserDetails] = useState(InitialuserDetails);
  const history = useHistory();

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={() => history.push("/add-users")}>Add user</Button>
      <Button variant="contained" color="secondary" onClick={() => history.push("/user-list")}>User list</Button>
      <Switch>
        <Route path="/add-users">
          <AddUser />
        </Route>
        <Route path="/user-list">
          <UserList />
        </Route>
        <Route path="/users/edit/:id">
          <EditUser />
        </Route>
      </Switch>
    </div>
  );
}

function User({ name, age, gender, city, editIcon, deleteIcon }) {
  return (
    <div>
      <div className="user-container">
        <h1 className="name">Name:{name}</h1>
        <p>Gender:{gender}</p>
        <p>Age:{age}</p>
        <p>City:{city}</p>
        {editIcon}
        {deleteIcon}
      </div>
    </div>
  );
}

function UserList() {
  const [userDetails, setUserDetails] = useState([]);

  const getusers = () => {
    fetch("https://61938761d3ae6d0017da864f.mockapi.io/users", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((user) => setUserDetails(user));
  };

  useEffect(() => getusers(), []);
  const history = useHistory();

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://61938761d3ae6d0017da864f.mockapi.io/users/${id}`, {
      method: "DELETE",
    }).then(() => getusers());
  };

  return (

    <div className="user-list">
      {userDetails.map((user, index) => (
        <User
          key={index}
          name={user.name}
          age={user.age}
          gender={user.gender}
          city={user.city}
          id={user.id}
          editIcon={
            <IconButton 
              onClick={() => history.push(`/users/edit/${user.id}`)}
              color="primary"   
              >
              <EditIcon />
            </IconButton>
          }
          deleteIcon={
            <IconButton 
              onClick={() => handleDelete(user.id)}
              color="error"
              >
              <DeleteIcon />
            </IconButton>
          }
        />
      ))}
    </div>
  );
}

function AddUser() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  return (
    <div className="add-user-form">
      <TextField
        type="text"
        onChange={(event) => setName(event.target.value)}
        label="Name"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        type="text"
        onChange={(event) => setGender(event.target.value)}
        label="Gender"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        type="text"
        onChange={(event) => setAge(event.target.value)}
        label="Age"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        type="text"
        onChange={(event) => setCity(event.target.value)}
        label="City"
        varient="filled"
        color="secondary"
        focused
      />
      <Button
        onClick={() => {
          const newUser = {
            name: name,
            gender: gender,
            age: age,
            city: city,
          };
          fetch(`https://61938761d3ae6d0017da864f.mockapi.io/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              "content-type": "application/json",
            },
          }).then(() => history.push("/user-list"));
        }}

        variant="contained"
        color="secondary"
      >
        Add
      </Button>
    </div>
  );
}

function EditUser(){
  const { id } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`https://61938761d3ae6d0017da864f.mockapi.io/users/${id}`,{
      method: "GET",
    })
    .then((data) => data.json())
    .then((usr) => setUser(usr))
  }, [])

  return(
    <div>
        {user ? <EditUserForm user={user}/> : "Loading"}
    </div>
  )
}

function EditUserForm({user}){
  const history = useHistory();
  
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [city, setCity] = useState(user.city);
  
  return (
    <div className="add-user-form">
      <TextField
        value={name}
        type="text"
        onChange={(event) => setName(event.target.value)}
        label="Name"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        value={gender}
        type="text"
        onChange={(event) => setGender(event.target.value)}
        label="Gender"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        value={age}
        type="text"
        onChange={(event) => setAge(event.target.value)}
        label="Age"
        varient="filled"
        color="secondary"
        focused
      />
      <TextField
        value={city}
        type="text"
        onChange={(event) => setCity(event.target.value)}
        label="City"
        varient="filled"
        color="secondary"
        focused
      />
      <Button
        onClick={() => {
          const updateUser = {
            name: name,
            gender: gender,
            age: age,
            city: city,
          };
          fetch(`https://61938761d3ae6d0017da864f.mockapi.io/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(updateUser),
            headers: {
              "content-type": "application/json",
            },
          }).then(() => history.push("/user-list"));
        }}

        variant="contained"
        color="secondary"
      >
        Save
      </Button>
      <Button
        onClick={() => history.push("/user-list")}
        variant="contained"
        color="primary"
      >
        Back
      </Button>
    </div>
  );
}

export default App;

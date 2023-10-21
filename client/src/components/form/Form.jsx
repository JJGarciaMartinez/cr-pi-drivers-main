import React, { useState } from "react";
import Validation from "./validation";
import "./formStyles.css";

export default function Form() {
  const [state, setState] = useState({
    name: "",
    lastName: "",
    nationality: "",
    image: "",
    dateOfBirth: "",
    teams: [],
    teamAdded: [],
  });
  const [errors, setErrors] = useState({
    name: "*",
    lastName: "*",
    nationality: "*",
    image: "*",
    dateOfBirth: "*",
    teams: "Select at least one team",
    teamAdded: "*",
  });

  const disableButton = () => {
    let aux = false;
    for (let error in errors) {
      if (errors[error] === "") aux = false;
      else {
        aux = true;
        break;
      }
    }
    return aux;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "teams") {
      setState({
        ...state,
        teams: [...state.teams, value],
      });
    } else if (name === "addTeam") {
      const value = document.getElementById("addTeam").value;
      setState({
        ...state,
        teamAdded: [...state.teamAdded, value],
      });
      document.getElementById("addTeam").value = "";
    } else {
      setState({
        ...state,
        [name]: value.trim(),
      });
    }
    setErrors(
      Validation({
        ...state,
        [name]: value.trim(),
      })
    );
  };

  return (
    <div className="form-container">
      {console.log(state)}
      <h1>Create Driver</h1>
      <form className="form">
        <label htmlFor="name">Name:</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label htmlFor="nationality">Nationality:</label>
        <input
          onChange={handleChange}
          type="text"
          name="nationality"
          placeholder="Enter nationality"
        />
        {errors.nationality && <p className="error">{errors.nationality}</p>}

        <label htmlFor="image">Image:</label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          placeholder="Enter URL image"
        />
        {errors.image && <p className="error">{errors.image}</p>}

        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          onChange={handleChange}
          type="date"
          name="dateOfBirth"
          placeholder="Enter date of birth"
        />
        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}

        <label htmlFor="teams">Select a Team:</label>
        <select name="teams" onChange={handleChange}>
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
          <option value="team3">Team 3</option>
        </select>
        {errors.teams && <p className="error">{errors.teams}</p>}

        <label htmlFor="team">Add Team:</label>
        <input type="text" id="addTeam" name="addTeam" />
        <button type="button" onClick={handleChange} name="addTeam">
          Add Team
        </button>

        <input type="submit" value="Submit" disabled={disableButton()} />
      </form>
    </div>
  );
}

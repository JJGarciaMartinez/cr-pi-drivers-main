import React, { useState } from "react";

export default function Form() {
  return (
    <div style={{ color: "rgb(21, 21, 31)" }}>
      <h1>Create Driver</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input type="text" name="name" placeholder="Enter Name" />
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input type="text" name="lastName" placeholder="Enter Last Name" />
        </label>
        <label htmlFor="nationality">
          Nationality:
          <input
            type="text"
            name="nationality"
            placeholder="Enter nationality"
          />
        </label>
        <label htmlFor="image">
          Image:
          <input type="text" name="image" placeholder="Enter URL image" />
        </label>

        <label htmlFor="dateOfBirth">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Enter date of birth"
          />
        </label>

        <label htmlFor="team">
          Team:
          <input type="text" name="team" placeholder="Enter teams" />
        </label>

        <label htmlFor="submit">
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}

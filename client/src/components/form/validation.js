export default function Validation(input) {
  const error = {};
  const regexInput = /^[A-Za-z\s]+$/;
  const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/;

  //* VALIDAR NOMBRES
  if (input.name === "") {
    error.name = "*";
  } else if (!regexInput.test(input.name)) {
    error.name = "Invalid name!";
  }

  //* VALIDAR APELLIDOS
  if (input.lastName === "") {
    error.lastName = "*";
  } else if (!regexInput.test(input.lastName)) {
    error.lastName = "Invalid last name!";
  }

  //* VALIDAR NACIONALIDAD
  if (input.nationality === "") {
    error.nationality = "*";
  } else if (!regexInput.test(input.nationality)) {
    error.nationality = "Invalid nationality!";
  }

  //* VALIDAR IMAGEN
  if (input.image === "") {
    error.image = "*";
  } else if (!regexImageUrl.test(input.image)) {
    error.image = "Invalid image URL!";
  }

  //* VALIDAR FECHA DE NACIMIENTO
  if (input.dateOfBirth === "") {
    error.dateOfBirth = "*";
  } else {
    const date = new Date(input.dateOfBirth);
    if (isNaN(date.getTime())) {
      error.dateOfBirth = "Invalid date of birth!";
    }
  }

  return error;
}

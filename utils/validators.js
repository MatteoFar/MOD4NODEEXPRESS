export function validatorInscription(
  firstName,
  lastName,
  email,
  password,
  password_confirm
) {
  if (
    (firstName === "",
    lastName === "",
    email === "",
    password === "",
    password_confirm === "")
  ) {
    throw "Il manque une ou plusieur données";
  }

  if (password !== password_confirm) {
    throw "les mots de passes ne corresponsent pas !";
  }
}

export function validatorLogin(email, passwordSent, passwordFromDB) {
  // todo : add validators
  let errors = [];

  if (passwordSent !== passwordFromDB) {
    throw "Les mots de passe ne correspondent pas !";
  }

  return errors;
}

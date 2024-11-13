function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

module.exports = { validateEmail, validatePassword };

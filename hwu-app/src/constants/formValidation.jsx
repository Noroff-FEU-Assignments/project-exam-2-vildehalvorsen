export const regName = /^(?=.*[a-zA-Z0-9])[_a-zA-Z0-9]*$/;
export const regEmail = /^\w+([-+.']\w+)*@?(stud.noroff.no)$/;

export const replaceSpaces = (e) => {
  if (e.keyCode === 32) {
    e.preventDefault();
    e.target.value += "_";
  }
};

export const validateName = (value) => {
  if (/^[_]+$/.test(value)) {
    return "Must contain at least one alphanumeric character";
  }

  if (!regName.test(value)) {
    return "Must not contain special characters or punctuation symbols other than underscore _";
  }

  return null;
};

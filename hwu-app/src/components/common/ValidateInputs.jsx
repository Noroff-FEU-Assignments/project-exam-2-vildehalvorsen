export const regName = /^(?=.*[a-zA-Z0-9])[_a-zA-Z0-9]*$/;
export const regEmail = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

export function replaceSpaces(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    e.target.value += "_";
  }
}

export default {
  primary: "#355f7a",
  secondary: "#142850",
  button: "#00909E",
  textMain: "white",
  text: "white",
  submit: "#33d100",
  delete: "#ff5c5c",
};

// Give the new layer a random color
export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

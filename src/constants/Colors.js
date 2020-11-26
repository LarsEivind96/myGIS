export default {
  primary: "#355f7a",
  secondary: "#142850",
  button: "#00909E",
  textMain: "white", //"#1c0000",
  text: "white",

  //button: "#DAE1E7",
  delete: "#ff2e2e", // "#8b0000",
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
export default {
  secondary: "#281028",
  primary: "#6897bb",
  text: "white",
  button: "grey",
  delete: "#8b0000",
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

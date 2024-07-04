const commonColors = {
  black: "#000",
  color: "#212a4d",
  footerNavLink: "gray",
  footerNavHeader: "#000",
  grey: "#fff",
  greyLight: "#edf3f5",
  softGrey: "#64738c",
  white: "#fff",
  blue: "#4C68DB",
  green: "#40a84f",
  yellow: "#9F6000",
  red: "#D8000C",
};

const colors = {
  ...commonColors,
  textColor: commonColors.black,
  primary: "#264692",
  secondary: "#000",
  outline: "transparent",
  white: "#fff",
  bg: "rgb(241, 243, 245)",
  promoBg: `linear-gradient(${commonColors.greyLight}, rgb(241, 243, 245))`,
  footerBg: "#fff",
  border: "#d9d9d9",
  overlay: "rgba(0, 0, 0, 0.5)",
  info: "#b6effb",
};

export default colors;

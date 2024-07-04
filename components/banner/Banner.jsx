import { View } from "components";

const Banner = ({ children }) => (
  <View
    width="1036px"
    display="flex"
    alignItems="center"
    maxwidth={{ sm: "100%", lg: "1036px" }}
    justifyContent="center"
    mt={["45px", "45px", "36px"]}
    mb={["45px", "45px", "85px"]}
    mx={["auto", "auto", "auto"]}
    px={["36px", "36px", "0"]}
    
  >
    {children}
  </View>
);

export default Banner;

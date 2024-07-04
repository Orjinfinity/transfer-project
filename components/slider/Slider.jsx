import { View } from "components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = ({ children, ...otherProps }) => {
  return (
    <View maxWidth="100vw" overflow="hidden" zIndex="1" position="relative">
      <Carousel {...otherProps}>{children}</Carousel>
    </View>
  );
};

export default Slider;

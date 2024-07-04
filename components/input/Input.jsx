import styled from "styled-components";
import { layout, space } from "styled-system";
import { Text, View } from "components";

const StyledInput = styled.input`
  position: relative;
  display: block;
  background: #ffffff;
  width: 100%;
  height: 58px;
  border: 1px solid #717070;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  color: #696b7e;
  transition: all 500ms ease;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #000;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #000;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #000;
  }
  ${layout}
  ${space}
`;

const input = ({ error, ...otherProps }) => {
  return (
    <View>
      <StyledInput {...otherProps}></StyledInput>
      {error?.message && (
        <Text fontSize="12px" fontWeight="bold" color="#e0c47d">
          {error.message}
        </Text>
      )}
    </View>
  );
};

input.propTypes = {};

export default input;

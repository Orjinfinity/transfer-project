import styled from "styled-components";

import Icon from "../icon/Icon";
import Text from "../text/Text";

import { useSelectContext } from "./selectContext";

const SelectButton = styled("button")`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #efefef;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const CheckIcon = styled(Icon)`
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  margin-left: auto;
  font-size: 1em;
`;

const SelectOption = ({ value, label, disabled }) => {
  const { setValue, getIsSelectedOption } = useSelectContext();

  const handleClick = () => setValue({ label, value });

  const isChecked = getIsSelectedOption(value);

  if (disabled) {
    return <Text size="sm">{label}</Text>;
  }

  return (
    <SelectButton
      type="button"
      color="softGrey"
      onClick={handleClick}
      tabIndex={0}
      role="option"
      aria-selected={isChecked}
    >
      {label}
      {<CheckIcon color="currentColor" icon="check" isVisible={isChecked} />}
    </SelectButton>
  );
};

export default SelectOption;

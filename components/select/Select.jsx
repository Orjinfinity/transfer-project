import { SelectContextProviderComponent } from "./selectContext";

import SelectToggle from "./SelectToggle";
import SelectOption from "./SelectOption";
import SelectList from "./SelectList";
import SelectWrapper from "./SelectWrapper";

const Select = ({
  children,
  searchArea,
  multiple,
  value,
  onChange,
  onBlur,
  placeholder,
  allSelected,
  renderSelectToggle,
  center,
  ...styledSystemProps
}) => {
  return (
    <SelectContextProviderComponent
      value={value}
      onChange={onChange ?? onBlur}
      multiple={multiple}
      placeholder={placeholder}
      allSelected={allSelected}
    >
      <SelectWrapper {...styledSystemProps}>
        <SelectToggle renderSelectToggle={renderSelectToggle} />
        <SelectList searchArea={searchArea} center={center}>{children}</SelectList>
      </SelectWrapper>
    </SelectContextProviderComponent>
  );
};

Select.Option = SelectOption;

export default Select;

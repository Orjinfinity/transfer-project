import { View, FieldArea, Icon } from "@/components";

import { useSelectContext } from "./selectContext";

import SelectOption from "./SelectOption";

const SelectList = ({ children, searchArea, center }) => {
  const { isOpen, value, allSelected } = useSelectContext();

  return isOpen ? (
    <View
      display="flex"
      flexDirection="column"
      role="listbox"
      aria-activedescendant={value}
      tabIndex={-1}
      position="absolute"
      top="100%"
      left={center ? "50%" : 0}
      transform={center ? "translate(-50%, 15px)" : "translateY(10px)"}
      zIndex={4}
      bg="white"
      borderRadius="5px"
      width="200px"
      overflowY="auto"
      border="1px solid #EFEFEF"
    >
      {searchArea ? (
        <View position="sticky" top="0" bg="white">
          <FieldArea>
            <Icon ml="5px" icon="search" />
            {searchArea}
          </FieldArea>
        </View>
      ) : null}
      {allSelected ? (
        <SelectOption value={allSelected?.value} label={allSelected?.label} />
      ) : null}
      {children}
    </View>
  ) : null;
};

export default SelectList;

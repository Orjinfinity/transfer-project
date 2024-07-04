import { View, FieldArea, Icon } from '@/components'

import { useSelectContext } from './selectContext'

import SelectOption from './SelectOption'

const SelectList = ({ children, searchArea }) => {
  const { isOpen, value, allSelected } = useSelectContext()

  return isOpen ? (
    <View
      display="flex"
      flexDirection="column"
      role="listbox"
      aria-activedescendant={value}
      tabIndex={-1}
      p={5}
      position="absolute"
      top="100%"
      marginTop={5}
      left="0"
      right="0"
      zIndex={4}
      bg="white"
      borderRadius="5px"
      maxHeight="300px"
      overflowY="auto"
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
  ) : null
}

export default SelectList

import { useMemo, useCallback } from 'react'
import styled from 'styled-components'

import Icon from '../icon/Icon'
import { View, Tag, Text } from '../index'

import { useSelectContext } from './selectContext'

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
`

const SelectToggle = () => {
  const {
    toggleSelect,
    isOpen,
    isEmpty,
    placeholder,
    selectedOptions,
    removeValue,
    multiple
  } = useSelectContext()

  const handleRemove = useCallback(
    (event, value) => {
      event.stopPropagation()
      removeValue(value)
    },
    [removeValue]
  )

  const viewArea = useMemo(() => {
    if (isEmpty)
      return (
        <Text as="span" opacity=".4">
          {placeholder}
        </Text>
      )

    if (multiple) {
      return selectedOptions.map(({ value, label }) => (
        <Tag
          key={value}
          m="3px"
          onRemove={(event) => handleRemove(event, value)}
        >
          {label}
        </Tag>
      ))
    }

    return (
      <Text color="black" as="span">
        {selectedOptions.label}
      </Text>
    )
  }, [handleRemove, isEmpty, multiple, placeholder, selectedOptions])

  return (
    <View
      role="button"
      onClick={toggleSelect}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      alignItems="center"
      justifyContent="space-between"
      p={10}
      maxHeight="140px"
      overflow="auto"
      display="flex"
    >
      <View>{viewArea}</View>
      <StyledIcon icon={isOpen ? 'chevron-up' : 'chevron-down'} />
    </View>
  )
}

export default SelectToggle

import styled from 'styled-components'

import Icon from '../icon/Icon'

import { useSelectContext } from './selectContext'

const SelectButton = styled('button')`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  padding: 10px;
  border-radius: 5px;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`

const CheckIcon = styled(Icon)`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  margin-left: auto;
  font-size: 1em;
`

const SelectOption = ({ value, label }) => {
  const { setValue, getIsSelectedOption } = useSelectContext()

  const handleClick = () => setValue({ value, label })

  const isChecked = getIsSelectedOption(value)

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
  )
}

export default SelectOption

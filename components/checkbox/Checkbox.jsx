import { forwardRef } from 'react'
import styled from 'styled-components'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, flexbox } from 'styled-system'

const StyledLabel = styled('label', { shouldForwardProp })`
  display: flex;
  align-items: center;
  font-size: 1em;
  width: 100%;
  cursor: pointer;
  position: relative;

  ${space}
  ${flexbox}
`

const StyledCheckBox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  top: 0;
  left: 0;
`

const StyledCustomCheckBox = styled.svg`
  display: inline-block;
  height: 0.9em;
  width: 0.9em;
  background: transparent;
  border: 2px #000 solid;
  margin-right: 4px;
  flex-shrink: 0;
  border-radius: 2px;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.green : 'transparent'};
  border-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.green : theme.colors.gray};
`

const Checkbox = forwardRef(
  ({ value, onChange, children, isChecked, id, name, ...styledProps }, ref) => {
    return (
      <StyledLabel ref={ref} htmlFor={id} {...styledProps}>
        <StyledCheckBox
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={onChange}
        />

        <StyledCustomCheckBox
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
          isChecked={isChecked}
        >
          {isChecked ? (
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke="#fff"
              strokeDasharray={9999}
              strokeDashoffset={0}
            />
          ) : null}
        </StyledCustomCheckBox>

        {children}
      </StyledLabel>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox

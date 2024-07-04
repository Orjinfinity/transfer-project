import PropTypes from 'prop-types'
import styled from 'styled-components'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, typography, layout } from 'styled-system'
import IcomoonReact from 'icomoon-react'

import iconSet from '@/public/fonts/icomoon/selection.json'
import { useTheme } from 'styled-components'

const StyledIcon = styled(IcomoonReact, { shouldForwardProp })`
  ${space}
  ${typography}
  ${layout}
`

const Icon = ({ color, size, icon, ...otherProps }) => {
  const { colors } = useTheme()

  const props = {
    iconSet,
    size,
    icon,
    ...otherProps,
    ...(color && { color: colors[color] ?? 'currentColor' })
  }

  return <StyledIcon {...props} />
}

Icon.defaultProps = {
  size: '1.2em'
}

Icon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon
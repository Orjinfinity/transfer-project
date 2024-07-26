import Text from './Text'

const ErrorMessage = ({ children, ...otherProps }) => (
  <Text size="xxs" color="red" {...otherProps}>
    {children}
  </Text>
)

export default ErrorMessage

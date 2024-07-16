import Text from './Text'

const ErrorMessage = ({ children, ...otherProps }) => (
  <Text size="xs" mt="2px" color="red" {...otherProps}>
    {children}
  </Text>
)

export default ErrorMessage

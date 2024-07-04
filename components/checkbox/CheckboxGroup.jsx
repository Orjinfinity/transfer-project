import View from '../view/View'

const CheckboxGroup = ({
  value,
  onChange,
  children,
  valueInterceptor,
  ...otherProps
}) => {
  const handleOnChange = (event) => {
    value.includes(valueInterceptor(event.target.value))
      ? onChange?.(
          value.filter(
            (item) =>
              valueInterceptor(item) !== valueInterceptor(event.target.value)
          )
        )
      : onChange?.([...value, valueInterceptor(event.target.value)])
  }

  return (
    <View value={value} onChange={handleOnChange} {...otherProps}>
      {children}
    </View>
  )
}

CheckboxGroup.defaultProps = {
  valueInterceptor: (val) => val
}

export default CheckboxGroup

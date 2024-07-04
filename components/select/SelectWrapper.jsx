import { useRef } from 'react'

import { useOnClickOutside } from '@/hooks'

import { View } from '@/components'

import { useSelectContext } from './selectContext'

const SelectWrapper = ({ children, ...styledSystemProps }) => {
  const { closeSelect } = useSelectContext()
  const ref = useRef()
  useOnClickOutside(ref, closeSelect)

  return (
    <View
      ref={ref}
      display="flex"
      flexDirection="column"
      position="relative"
      width="100%"
      tabIndex={0}
      fontSize="1em"
      {...styledSystemProps}
    >
      {children}
    </View>
  )
}

export default SelectWrapper

import { createPortal } from 'react-dom'

const Portal = ({ children, mounted }) => {
  if (!mounted || typeof window === 'undefined') return null
  const container = document?.getElementById('portal')
  return createPortal(children, container)
}

export default Portal

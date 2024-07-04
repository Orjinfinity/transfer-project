export const PHONE_NUMBER =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

export const EMAIL_ADDRESS = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const TAX_TC_NO = /^[0-9]{10,11}$/
import * as yup from "yup";

const turkishPhoneNumberRegex =
  /^(\+?90|0)?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;

export const contactSchema = yup.object().shape({
  name: yup.string().required("Adınızı Giriniz"),
  company: yup.string(),
  email: yup.string().email("Email Giriniz").required("Email Giriniz"),
  phone: yup
    .string()
    .required("Telefon Numaranızı Giriniz")
    .matches(
      turkishPhoneNumberRegex,
      "Geçerli bir Türkiye telefon numarası giriniz"
    ),
  message: yup.string().required("Mesajınızı giriniz"),
  sozlesme: yup
    .boolean()
    .required("Sözleşmeyi Onaylayın")
    .oneOf([true], "Sözleşmeyi Onaylayın"),
});

export const offerSchema = yup.object().shape({
  name: yup.string().required("Adınızı Giriniz"),
  company: yup.string(),
  email: yup.string().email("Email Giriniz").required("Email Giriniz"),
  phone: yup
    .string()
    .required("Telefon Numaranızı Giriniz")
    .matches(
      turkishPhoneNumberRegex,
      "Geçerli bir Türkiye telefon numarası giriniz"
    ),
  message: yup.string().required("Mesajınızı giriniz"),
  sozlesme: yup
    .boolean()
    .required("Sözleşmeyi Onaylayın")
    .oneOf([true], "Sözleşmeyi Onaylayın"),
});
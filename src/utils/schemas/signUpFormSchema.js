import { object, string, ref } from "yup";
import ERRORMESSAGES from "../constants/errorMessages";

const SIGN_UP_FORM_SCHEMA = object().shape({
  email: string().email(ERRORMESSAGES.invEmail).required(ERRORMESSAGES.noEmail),
  password: string()
    .required(ERRORMESSAGES.noPassword)
    .min(6, ERRORMESSAGES.invPasswordLength),
  repeatPassword: string()
    .required(ERRORMESSAGES.noPassword)
    .oneOf([ref("password")], ERRORMESSAGES.passwordNotMatched),
  userName: string().trim().required(ERRORMESSAGES.noUserName),
  userSurname: string().trim().required(ERRORMESSAGES.noUserSurname)
});

export default SIGN_UP_FORM_SCHEMA;

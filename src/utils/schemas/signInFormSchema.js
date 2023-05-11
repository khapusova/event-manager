import { object, string } from "yup";
import ERRORMESSAGES from "../constants/errorMessages";

const SIGN_IN_FORM_SCHEMA = object().shape({
  email: string().email(ERRORMESSAGES.invEmail).required(ERRORMESSAGES.noEmail),
  password: string()
    .required(ERRORMESSAGES.noPassword)
    .min(6, ERRORMESSAGES.invPasswordLength)
});

export default SIGN_IN_FORM_SCHEMA;

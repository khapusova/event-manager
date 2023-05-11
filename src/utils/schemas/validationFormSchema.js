import { object, string } from "yup";
import ERRORMESSAGES from "../constants/errorMessages";
import { validationCode } from "../constants/validationCode";

const VALIDATION_FORM_SCHEMA = object().shape({
  validationCode: string()
    .required(ERRORMESSAGES.noCode)
    .matches(/^[0-9]+$/, ERRORMESSAGES.invDigitType)
    .min(4, ERRORMESSAGES.invDigitLength)
    .max(4, ERRORMESSAGES.invDigitLength)
    .matches(validationCode, ERRORMESSAGES.invCode)
});

export default VALIDATION_FORM_SCHEMA;

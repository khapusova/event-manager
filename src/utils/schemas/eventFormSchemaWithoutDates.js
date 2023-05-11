import { object, string, boolean } from "yup";
import ERRORMESSAGES from "../constants/errorMessages";

const EVENT_FORM_SCHEMA_WITHOUT_DATES = object().shape({
  noDate: boolean(),
  eventName: string().trim().required(ERRORMESSAGES.noEventName),
  location: string().trim().required(ERRORMESSAGES.noLocation)
});

export default EVENT_FORM_SCHEMA_WITHOUT_DATES;

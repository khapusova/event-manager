import { object, date, string, ref, boolean } from "yup";
import ERRORMESSAGES from "../constants/errorMessages";

const EVENT_FORM_SCHEMA = object().shape({
  noDate: boolean(),
  eventName: string().trim().required(ERRORMESSAGES.noEventName),
  location: string().trim().required(ERRORMESSAGES.noLocation),
  startDate: date()
    .required(ERRORMESSAGES.noStartDate)
    .typeError(ERRORMESSAGES.noStartDate),
  endDate: date()
    .min(ref("startDate"), ERRORMESSAGES.invEndDate)
    .required()
    .typeError(ERRORMESSAGES.noEndDate)
});

export default EVENT_FORM_SCHEMA;

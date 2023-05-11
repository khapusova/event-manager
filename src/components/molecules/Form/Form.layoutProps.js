import i18n from "@src/i18n";

export const inputLayoutProps = [
  {
    id: "eventName",
    placeholder: i18n.t("EventData.eventName"),
    type: "text"
  },
  {
    id: "location",
    placeholder: i18n.t("EventData.location"),
    type: "text"
  },
  {
    id: "startDate",
    type: "date"
  },
  {
    id: "endDate",
    type: "date"
  }
];

export const validationInputLayoutProps = {
  id: "validationCode"
};

export const signingUpInputLayoutProps = [
  {
    placeholder: i18n.t("AuthData.userName"),
    id: "userName",
    type: "text"
  },
  {
    placeholder: i18n.t("AuthData.userSurname"),
    id: "userSurname",
    type: "text"
  },
  {
    placeholder: i18n.t("AuthData.email"),
    id: "email",
    type: "text"
  },
  {
    placeholder: i18n.t("AuthData.password"),
    id: "password",
    type: "text"
  },
  {
    placeholder: i18n.t("AuthData.repeatPassword"),
    id: "repeatPassword",
    type: "text"
  }
];

export const signingInInputLayoutProps = [
  {
    placeholder: i18n.t("AuthData.email"),
    id: "email",
    type: "text"
  },
  {
    placeholder: i18n.t("AuthData.password"),
    id: "password",
    type: "text"
  }
];

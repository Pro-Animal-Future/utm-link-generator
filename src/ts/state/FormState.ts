import { QUESTIONS } from "../config/questions";
import Observable from "./Observable";

export type Medium = (typeof QUESTIONS)["medium"]["options"][number]["value"];

interface Options {
  source: string | undefined;
  campaignName: string | undefined;
  id: string | undefined;
  content: string | undefined;
}

export interface FormState {
  url: string | undefined;
  medium: Medium | undefined;
  email: Options;
  field: Options;
  organicSocial: Options;
  paidMail: Options;
  paidSocial: Options;
  paidSms: Options;
}

export function initFormState(): Observable<FormState> {
  const createOptions = () => ({
    source: undefined,
    campaignName: undefined,
    id: undefined,
    content: undefined,
  });
  return new Observable<FormState>("form state", {
    url: undefined,
    medium: undefined,
    email: createOptions(),
    field: createOptions(),
    organicSocial: createOptions(),
    paidMail: createOptions(),
    paidSocial: createOptions(),
    paidSms: createOptions(),
  });
}

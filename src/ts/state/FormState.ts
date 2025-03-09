import { QUESTIONS } from "../config/questions";
import { NONE_OPTION } from "../form/question";
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
  const createOptions = (options: { skipContent?: boolean }) => ({
    source: undefined,
    campaignName: undefined,
    id: undefined,
    content: options.skipContent ? NONE_OPTION.value : undefined,
  });
  return new Observable<FormState>("form state", {
    url: undefined,
    medium: undefined,
    email: createOptions({ skipContent: true }),
    field: createOptions({}),
    organicSocial: createOptions({}),
    paidMail: createOptions({}),
    paidSocial: createOptions({}),
    paidSms: createOptions({}),
  });
}

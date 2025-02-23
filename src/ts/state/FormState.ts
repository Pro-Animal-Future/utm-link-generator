import { QUESTIONS } from "../config/questions";
import Observable from "./Observable";

export type Medium = (typeof QUESTIONS)["medium"]["options"][number]["value"];

interface CommonOptions {
  source: string | undefined;
  campaignName: string | undefined;
}

export type EmailOptions = CommonOptions;
export type FieldOptions = CommonOptions;
export type OrganicSocialOptions = CommonOptions;

export type PaidMailOptions = CommonOptions;
export type PaidSearchOptions = CommonOptions;
export type PaidSocialOptions = CommonOptions;
export type PaidSmsOptions = CommonOptions;

export interface FormState {
  url: string | undefined;
  medium: Medium | undefined;
  email: EmailOptions;
  field: FieldOptions;
  organicSocial: OrganicSocialOptions;
  paidMail: PaidMailOptions;
  paidSearch: PaidSearchOptions;
  paidSocial: PaidSocialOptions;
  paidSms: PaidSmsOptions;
}

export function initFormState(): Observable<FormState> {
  return new Observable<FormState>("form state", {
    url: undefined,
    medium: undefined,
    email: { source: undefined, campaignName: undefined },
    field: { source: undefined, campaignName: undefined },
    organicSocial: { source: undefined, campaignName: undefined },
    paidMail: { source: undefined, campaignName: undefined },
    paidSearch: { source: undefined, campaignName: undefined },
    paidSocial: { source: undefined, campaignName: undefined },
    paidSms: { source: undefined, campaignName: undefined },
  });
}

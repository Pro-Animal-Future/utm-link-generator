import Observable from "./Observable";

export type CommunicationType = "ad" | "email" | "field" | "social";

export interface AdOptions {
  medium: string | undefined;
  campaignName: string | undefined;
}

export interface EmailOptions {
  source: string | undefined;
}

export interface FieldOptions {
  source: string | undefined;
  campaignName: string | undefined;
}

export interface SocialOptions {
  source: string | undefined;
  campaignName: string | undefined;
}

export interface FormState {
  url: string | undefined;
  type: CommunicationType | undefined;
  adOptions: AdOptions;
  emailOptions: EmailOptions;
  fieldOptions: FieldOptions;
  socialOptions: SocialOptions;
}

export function initFormState(): Observable<FormState> {
  return new Observable<FormState>("form state", {
    url: undefined,
    type: undefined,
    adOptions: {
      medium: undefined,
      campaignName: undefined,
    },
    emailOptions: { source: undefined },
    fieldOptions: { source: undefined, campaignName: undefined },
    socialOptions: { source: undefined, campaignName: undefined },
  });
}

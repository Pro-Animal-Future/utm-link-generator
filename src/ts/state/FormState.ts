import Observable from "./Observable";

export type CommunicationType = "ad" | "email" | "field" | "social";

export interface AdOptions {
  medium: string | undefined;
}

export interface EmailOptions {}

export interface FieldOptions {}

export interface SocialOptions {}

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
    url: "https://proanimal.org",
    type: undefined,
    adOptions: { medium: undefined },
    emailOptions: {},
    fieldOptions: {},
    socialOptions: {},
  });
}

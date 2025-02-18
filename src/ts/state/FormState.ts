import Observable from "./Observable";

export type CommunicationType = "ad" | "email" | "field" | "social";

export interface AdOptions {
  medium: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EmailOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FieldOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
    url: undefined,
    type: undefined,
    adOptions: { medium: undefined },
    emailOptions: {},
    fieldOptions: {},
    socialOptions: {},
  });
}

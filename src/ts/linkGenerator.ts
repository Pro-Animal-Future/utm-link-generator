import { FormState } from "./state/FormState";
import Observable from "./state/Observable";

export function generateLink(state: FormState): string | null {
  if (!state.url || !state.type) return null;
  let medium: string | undefined;
  switch (state.type) {
    case "ad":
      medium = state.adOptions.medium;
      break;
    case "email":
      medium = "email";
      break;
    case "field":
      medium = "field";
      break;
    case "social":
      medium = "organic_social";
      break;
    default:
      throw new Error(`Unexpected type: ${state.type}`);
  }
  if (!medium) return null;
  return `${state.url}?utm_medium=${medium}`;
}

export function subscribeLinkGenerator(formState: Observable<FormState>): void {
  const element = document.getElementById(
    "generated-link",
  ) as HTMLParagraphElement;
  formState.subscribe((state) => {
    const link = generateLink(state) ?? "Cannot generate link";
    element.textContent = link;
  });
}

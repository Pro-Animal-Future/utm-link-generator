import { initForm } from "./form/initForm";
import { initFormState } from "./state/FormState";
import { subscribeLinkGenerator } from "./linkGenerator";

export default function initApp(): void {
  const formState = initFormState();
  initForm(formState);
  subscribeLinkGenerator(formState);
  formState.initialize();
}

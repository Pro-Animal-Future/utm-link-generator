import { initForm } from "./form/initForm";
import { initFormState } from "./state/FormState";
import initResult from "./result/initResult";

export default function initApp(): void {
  const formState = initFormState();
  initForm(formState);
  initResult(formState);

  // Debugging
  formState.subscribe((v) => console.log(v));

  formState.initialize();
}

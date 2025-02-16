import { CommunicationType, FormState } from "../state/FormState";
import Observable from "../state/Observable";

export function initForm(formState: Observable<FormState>): void {
  const communicationTypeFieldSet = document.getElementById(
    "communication-type",
  ) as HTMLFieldSetElement;
  communicationTypeFieldSet.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    formState.setValue({
      ...formState.getValue(),
      type: e.target.value as CommunicationType,
    });
  });
}

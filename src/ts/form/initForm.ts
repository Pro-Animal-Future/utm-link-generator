import { CommunicationType, FormState } from "../state/FormState";
import Observable from "../state/Observable";
import { generateRadioGroup } from "./radio";

function initCommunicationType(
  form: HTMLFormElement,
  formState: Observable<FormState>,
): void {
  const fieldSet = generateRadioGroup({
    id: "communication-type",
    label: "Communication type",
    options: [
      { value: "ad", label: "Advertisement" },
      { value: "email", label: "Email" },
      { value: "field", label: "Field" },
      { value: "social", label: "Organic social media" },
    ],
  });
  form.appendChild(fieldSet);

  fieldSet.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    formState.setValue({
      ...formState.getValue(),
      type: e.target.value as CommunicationType,
    });
  });
}

export function initForm(formState: Observable<FormState>): void {
  const form = document.getElementById("utm-form") as HTMLFormElement;
  initCommunicationType(form, formState);
}

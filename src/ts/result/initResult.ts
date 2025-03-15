import Observable from "../state/Observable";
import type { FormState } from "../state/FormState";
import { generateLink } from "./linkGenerator";

function addErrors(errors: string[]): void {
  const ul = document.getElementById("error-list") as HTMLUListElement;
  ul.replaceChildren(
    ...errors.map((err) => {
      const li = document.createElement("li");
      li.textContent = err;
      return li;
    }),
  );
}

export default function initResult(formState: Observable<FormState>): void {
  const errorContainer = document.getElementById(
    "error-container",
  ) as HTMLDivElement;
  const successContainer = document.getElementById(
    "success-container",
  ) as HTMLDivElement;
  formState.subscribe((state) => {
    const result = generateLink(state);
    errorContainer.hidden = result.success;
    successContainer.hidden = !result.success;
    if (result.success) {
      successContainer.querySelector("#generated-link")!.textContent =
        result.url;
    } else {
      addErrors(result.errors);
    }
  });
}

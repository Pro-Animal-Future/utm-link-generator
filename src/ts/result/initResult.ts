import Observable from "../state/Observable";
import type { FormState } from "../state/FormState";
import { generateLink } from "./linkGenerator";

async function copyToClipboard(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.error("Failed to write to clipboard: ", err);
  }
}

function switchCopyIcons(container: HTMLElement): void {
  const linkIcon = container.querySelector<SVGElement>("svg.copy-icon");
  const checkIcon = container.querySelector<SVGElement>("svg.check-icon");
  if (!linkIcon || !checkIcon) return;

  linkIcon.style.display = "none";
  checkIcon.style.display = "inline-block";
  setTimeout(() => {
    linkIcon.style.display = "inline-block";
    checkIcon.style.display = "none";
  }, 1500);
}

function setUrl(url: string): void {
  document.querySelector("#generated-link")!.textContent = url;
  const copyButton = document.querySelector(
    "#success-container .copy-button",
  ) as HTMLElement;
  copyButton.addEventListener("click", async () => {
    await copyToClipboard(url);
    switchCopyIcons(copyButton);
  });
}

function setErrors(errors: string[]): void {
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
    successContainer.style.display = result.success ? "flex" : "none";
    if (result.success) {
      setUrl(result.url);
    } else {
      setErrors(result.errors);
    }
  });
}

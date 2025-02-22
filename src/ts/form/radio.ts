export interface RadioOption {
  value: string;
  description?: string;
  textInput?: boolean;
}

export interface RadioGroup {
  id: string;
  label: string;
  options: readonly RadioOption[];
}

function linkRadioTextPair(
  textInput: HTMLInputElement,
  radioInput: HTMLInputElement,
): void {
  textInput.addEventListener("input", () => {
    radioInput.checked = true;
  });

  radioInput.addEventListener("change", () => {
    if (radioInput.checked) {
      textInput.focus();
    }
  });
}

function generateRadioOption(
  outerId: string,
  option: RadioOption,
): HTMLDivElement {
  const radioDiv = document.createElement("div");
  radioDiv.classList.add("radio-option-container");

  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = outerId;
  radioInput.value = option.value;
  radioInput.id = `${outerId}-${option.value}`;
  radioInput.classList.add("radio-input");
  radioDiv.appendChild(radioInput);

  const label = document.createElement("label");
  label.htmlFor = radioInput.id;
  label.classList.add("radio-label");
  const labelText = document.createTextNode(option.value);
  label.appendChild(labelText);
  if (option.description) {
    const description = document.createElement("span");
    description.textContent = option.description;
    description.classList.add("radio-description");
    label.appendChild(description);
  }
  radioDiv.appendChild(label);

  if (!option.textInput) return radioDiv;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.classList.add("radio-text-input");
  textInput.id = `${outerId}-${option.value}-text`;
  textInput.name = textInput.id;
  textInput.setAttribute("aria-labelledby", `${outerId}-${option.value}`);
  radioDiv.appendChild(textInput);

  linkRadioTextPair(textInput, radioInput);

  return radioDiv;
}

export function generateRadioGroup(request: RadioGroup): HTMLFieldSetElement {
  const fieldSet = document.createElement("fieldset");
  fieldSet.id = request.id;
  fieldSet.classList.add("radio-fieldset");

  const legend = document.createElement("legend");
  legend.textContent = request.label;
  legend.classList.add("radio-legend");
  fieldSet.appendChild(legend);

  request.options.forEach((option) => {
    const radioDiv = generateRadioOption(request.id, option);
    fieldSet.appendChild(radioDiv);
  });

  return fieldSet;
}

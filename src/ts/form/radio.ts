export interface RadioOption {
  value: string;
  description?: string;
  textInput?: boolean;
}

export interface RadioGroup {
  id: string;
  label: string;
  options: readonly RadioOption[];
  optional?: boolean;
}

export const NONE_OPTION: RadioOption = { value: "Do not set this option" };

function generateRadioTextInput(
  radioInput: HTMLInputElement,
): HTMLInputElement {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.classList.add("radio-text-input");
  textInput.id = `${radioInput.id}-text`;
  textInput.name = textInput.id;
  textInput.setAttribute("aria-labelledby", radioInput.id);

  textInput.addEventListener("input", () => {
    radioInput.checked = true;
  });

  radioInput.addEventListener("change", () => {
    if (radioInput.checked) {
      textInput.focus();
    }
  });

  return textInput;
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

  if (option.textInput) {
    const textInput = generateRadioTextInput(radioInput);
    radioDiv.appendChild(textInput);
  }

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

  const allOptions = request.optional
    ? [NONE_OPTION, ...request.options]
    : request.options;
  allOptions.forEach((option) => {
    const radioDiv = generateRadioOption(request.id, option);
    fieldSet.appendChild(radioDiv);
  });

  return fieldSet;
}

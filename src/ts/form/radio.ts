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

  // Typing results in selecting the radio option.
  //
  // Note that the text input's "input" event will also bubble up
  // to the event listener configured in initRadioGroup() in initForm.ts on
  // the outer fieldset. This means that when a user types, that event
  // listener will properly update the form state by calling `updateFormState()`
  // with the text input's value.
  textInput.addEventListener("input", () => {
    radioInput.checked = true;
  });

  // Selecting the radio auto-focuses text.
  //
  // We also dispatch an "input" event on the corresponding textInput.
  // This is subtle. This dispatched "input" event will bubble up to the
  // fieldset's event handler in initRadioGroup() in initForm.ts. That
  // event handler will first have already processed the "input" that
  // was triggered by clicking the radio option, and it will have called
  // `updateFormState` to update the form state to use the radio button's value.
  // Then, the below "change" event listener will trigger, where we dispatch
  // a new "input" event on the textInput. The fieldset's event handler will
  // handle this dispatched "input" event to update the form state again
  // with the text value. The flow looks like:
  //
  //   1. User clicks the radio button
  //   2. Radio button fires off "input" (via the browser). This is handled by initRadioGroup() and
  //      updates the form state to the radio button's value. Note that this value is actually bad
  //      and shouldn't be used by the UTM link generator, but we are okay with it
  //      because the value will be overwritten in the following steps.
  //   3. Radio button fires off "change" (via the browser). That results in the
  //      following event listener in this file running.
  //   4. The following "change" event listener dispatches an "input" event on the
  //      corresponding text <input> element.
  //   5. The event handler in initRadioGroup() handles this new "input" event. It updates
  //      the form state to now use the latest value of the text <input> element.
  radioInput.addEventListener("change", () => {
    if (radioInput.checked) {
      textInput.focus();
    }
    textInput.dispatchEvent(new Event("input", { bubbles: true }));
  });

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

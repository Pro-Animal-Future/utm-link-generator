import { expect, test } from "@playwright/test";

import { placeholder } from "../src/ts/main";

test("placeholder", () => {
  expect(placeholder()).toEqual(0);
});

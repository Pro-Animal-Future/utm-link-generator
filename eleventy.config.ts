/** Config for Eleventy to generate the details pages. */

// @ts-ignore
import CleanCSS from "clean-css";
import { compileString as compileStringSass } from "sass";

export default async function (eleventyConfig: any) {
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  });

  eleventyConfig.addFilter(
    "scss_compile",
    (code: any) => compileStringSass(code).css,
  );
  eleventyConfig.addFilter(
    "cssmin",
    (code: any) => new CleanCSS({}).minify(code).styles,
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}

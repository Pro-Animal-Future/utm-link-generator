export function placeholder(): number {
  return 0;
}

export default function initApp(): void {
  document.querySelector("h1")!.textContent = "Hello world!";
}

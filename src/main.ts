import "./main.scss";
import { Theme, ThemeControl } from "./ts/theme";
import { Calculator } from "./ts/calculator";

// Initialize Theme
const body: HTMLBodyElement = document.querySelector("body");
let themeControl: ThemeControl = new ThemeControl({ cssVarElement: body });

// Theme Controls
const themeControls: HTMLElement = document.querySelector(
  ".calc__theme-controls"
);
const themeToggler: HTMLInputElement =
  themeControls.querySelector(".theme-toggler");

themeToggler.value = themeControl.getTheme();
themeToggler.addEventListener("input", () => {
  themeControl.setTheme(themeToggler.value as Theme);
});

const themeLabels = themeControls.querySelectorAll(".labels .label");
themeLabels.forEach((item) => {
  item.addEventListener("click", () => {
    themeControl.setTheme(item.getAttribute("data-theme-index") as Theme);
    themeToggler.value = item.getAttribute("data-theme-index");
  });
});

// Calc Controls Logic
const keys: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".calc__key");
const screen: HTMLInputElement = document.querySelector(".calc__screen");
const calcKeys: HTMLDivElement = document.querySelector(".calc__controls");

let calc = new Calculator(screen);

calcKeys.addEventListener("click", (event) => calc.clickHandler(event.target));
document.addEventListener("keydown", toggleActiveClass);
document.addEventListener("keyup", toggleActiveClass);

function toggleActiveClass(event: KeyboardEvent) {
  keys.forEach((item) => {
    if (
      item.getAttribute("data-content") === event.key ||
      item.getAttribute("data-op") === event.key ||
      (item.getAttribute("data-action") === "delete" &&
        event.key === "Backspace") ||
      (item.getAttribute("data-action") === "reset" &&
        event.key === "Escape") ||
      (item.getAttribute("data-action") === "result" &&
        event.key === "Enter") ||
      (item.getAttribute("data-action") === "result" && event.key === "=")
    ) {
      event.type === "keydown"
        ? (() => {
            item.classList.add("active");
            item.click();
          })()
        : item.classList.remove("active");
    }
  });
}

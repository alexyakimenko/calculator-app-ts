enum KeyType {
  Number = "number",
  F_Point = "f_point",
  Operator = "operator",
  Action = "action",
}

class Calculator {
  private screen: HTMLInputElement;

  private value: string = "0";
  private lastResult: string = "";

  constructor(screen: HTMLInputElement) {
    this.screen = screen;
    this.value = localStorage.getItem("screenValue") || "0";
    this.lastResult = this.value

    screen.value.length
      ? (this.value = screen.value)
      : (screen.value = this.value);
  }

  public clickHandler(target: EventTarget) {
    // Event delegation :3
    if (!(target instanceof Element) || target.tagName !== "BUTTON") return;
    const keyType: KeyType = target.getAttribute("data-type") as KeyType;

    switch (keyType) {
      case KeyType.Number:
        this.handleNumber(target);
        break;
      case KeyType.F_Point:
        this.handlePoint(target);
        break;
      case KeyType.Operator:
        this.handleOperator(target);
        break;
      case KeyType.Action:
        this.handleAction(target);
        break;
      default:
        return;
    }

    this.screen.value = this.value;
    localStorage.setItem("screenValue", this.value);
  }

  private handleNumber(key: Element) {
    const keyContent: string = key.getAttribute("data-content");

    if (this.value === "0" || this.value === this.lastResult) {
      this.value = keyContent;
      return;
    }
    // Regex
    const expression: string[] = this.value.split(/(\/|\+|\-|\*)/);
    const lastNumber: string = expression[expression.length - 1] || "";

    if (lastNumber === "0") {
      this.value = this.value.slice(0, -1) + keyContent;
      return;
    }

    this.value += keyContent;
  }
  private handlePoint(key: Element) {
    const keyContent: string = key.getAttribute("data-content");

    if (this.value === this.lastResult) {
      this.value = "0";
    }
    // Regex
    const expression: string[] = this.value.split(/(\/|\+|\-|\*)/);
    const re: RegExp = new RegExp(keyContent, "g");
    const dots: string[] = expression[expression.length - 1].match(re) || [];

    if (dots.length > 1) return;

    if (this.isOperator(this.getLastChar(this.value))) {
      this.value += "0" + keyContent;
      return;
    }

    this.value += keyContent;
  }

  private handleOperator(key: Element) {
    const operator: string = key.getAttribute("data-op");

    if (this.value === "0") {
      this.value = "0" + operator;
      return;
    }

    if (this.isOperator(this.getLastChar(this.value))) {
      this.value = this.value.slice(0, -1) + operator;
      return;
    }

    this.value += operator;
  }

  private handleAction(key: Element) {
    const action: string = key.getAttribute("data-action");

    switch (action) {
      case "reset":
        this.value = "0";
        break;
      case "delete":
        if (this.value === this.lastResult) {
          this.value = "0";
          return;
        }
        this.value = this.value.slice(0, -1);
        if (this.value.length === 0) this.value = "0";
        break;
      case "result":
        let result: string = this.getResult().toString();
        this.lastResult = result;
        this.value = result;
        break;
    }
  }

  private getResult(): number {
    if (this.isOperator(this.getLastChar(this.value))) {
      this.value = this.value.slice(0, -1);
    }

    let result: number = eval(eval(this.value).toFixed(9).toString());

    if (Number.isNaN(result)) result = 0;

    return result;
  }

  private isOperator(char: string): boolean {
    return !!char.match(/(\/|\+|\-|\*)/);
  }

  private getLastChar(str: string, deph: number = 1) {
    return str[str.length - deph] || "";
  }
}

export { Calculator };

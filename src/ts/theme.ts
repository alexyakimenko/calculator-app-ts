enum Theme {
  Blue = "1",
  Grey = "2",
  Violet = "3",
}

interface ThemeColors {
  // backgrounds
  main_bg: string;
  toggle_bg: string;
  screen_bg: string;
  // keys
  key_bg: string;
  key_shadow: string;
  action_key_bg: string;
  action_key_shadow: string;
  result_key_bg: string;
  result_key_shadow: string;
  // text
  header_text: string;
  key_text: string;
  action_key_text: string;
  result_key_text: string;
}

const colors: { [key in Theme]?: ThemeColors } = {
  [Theme.Blue]: {
    main_bg: "hsl(222, 26%, 31%)",
    toggle_bg: "hsl(223, 31%, 20%)",
    screen_bg: "hsl(224, 36%, 15%)",
    key_bg: "hsl(30, 25%, 89%)",
    key_shadow: "hsl(28, 16%, 65%)",
    action_key_bg: "hsl(225, 21%, 49%)",
    action_key_shadow: "hsl(224, 28%, 35%)",
    result_key_bg: "hsl(6, 63%, 50%)",
    result_key_shadow: "hsl(6, 70%, 34%)",
    header_text: "hsl(0, 0%, 100%)",
    key_text: "hsl(221, 14%, 31%)",
    action_key_text: "hsl(0, 0%, 100%)",
    result_key_text: "hsl(0, 0%, 100%)",
  },
  [Theme.Grey]: {
    main_bg: "hsl(0, 0%, 90%)",
    toggle_bg: "hsl(0, 5%, 81%)",
    screen_bg: "hsl(0, 0%, 93%)",
    key_bg: "hsl(45, 7%, 89%)",
    key_shadow: "hsl(35, 11%, 61%",
    action_key_bg: "hsl(185, 42%, 37%",
    action_key_shadow: "hsl(185, 58%, 25%)",
    result_key_bg: "hsl(25, 98%, 40%)",
    result_key_shadow: "hsl(25, 99%, 27%)",
    header_text: "hsl(60, 10%, 19%)",
    key_text: "hsl(60, 10%, 19%)",
    action_key_text: "hsl(0, 0%, 100%)",
    result_key_text: "hsl(0, 0%, 100%)",
  },
  [Theme.Violet]: {
    main_bg: "hsl(268, 75%, 9%)",
    toggle_bg: "hsl(268, 71%, 12%)",
    screen_bg: "hsl(268, 71%, 12%)",
    key_bg: "hsl(268, 47%, 21%)",
    key_shadow: "hsl(290, 70%, 36%)",
    action_key_bg: "hsl(281, 89%, 26%)",
    action_key_shadow: "hsl(285, 91%, 52%)",
    result_key_bg: "hsl(176, 100%, 44%)",
    result_key_shadow: "hsl(177, 92%, 70%)",
    header_text: "hsl(52, 100%, 62%)",
    key_text: "hsl(52, 100%, 62%)",
    action_key_text: "hsl(0, 0%, 100%)",
    result_key_text: "hsl(198, 20%, 13%)",
  },
};

function getThemeColors(theme: Theme): ThemeColors {
  return colors[theme];
}

// Theme Control Class

interface InitialValues {
  theme?: Theme;
  cssVarElement?: string | HTMLElement;
}

class ThemeControl {
  private theme: Theme;
  private themeColors: ThemeColors;
  private varElement: HTMLElement;

  constructor(init: InitialValues) {
    if (init.theme) {
      localStorage.setItem("theme", init.theme);
    } else {
      if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "1" as Theme);
      }
    }

    if (typeof init.cssVarElement === "string") {
      try {
        this.varElement = document.querySelector(init.cssVarElement);
      } catch (e) {
        console.error(e, "Default element will be used -> :root");
        this.varElement = document.body.parentElement;
      }
    } else {
      this.varElement = init.cssVarElement;
    }

    this.setTheme(localStorage.getItem("theme") as Theme);
  }

  public setTheme(newTheme: Theme): void {
    if (newTheme === this.theme) return;

    this.theme = newTheme;
    this.themeColors = getThemeColors(newTheme);

    this.setThemeCssVariables();

    localStorage.setItem("theme", this.theme);
  }

  public getTheme(): Theme {
    return this.theme;
  }

  private setThemeCssVariables(): void {
    for (let key in this.themeColors) {
      let property = key.replace(/_/g, "-");
      this.varElement.style.setProperty(`--${property}`, this.themeColors[key]);
    }
  }
}

export { Theme, ThemeControl };

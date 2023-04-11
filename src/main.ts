import './main.scss'
import {Theme, getThemeColors, ThemeColors, setThemeCssVariables} from "./ts/theme"

// Set Theme  
if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", Theme.Blue)
}
let pageTheme: Theme = localStorage.getItem("theme") as Theme;
const body: HTMLBodyElement = document.querySelector("body")

const currentThemeColors: ThemeColors = getThemeColors(pageTheme) 
setThemeCssVariables(body, currentThemeColors)
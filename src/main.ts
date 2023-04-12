import './main.scss'
import {Theme, getThemeColors, ThemeColors, setThemeCssVariables, getThemeByIndex} from "./ts/theme"

// Set Theme  
if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", Theme.Blue)
}
let pageTheme: Theme = localStorage.getItem('theme') as Theme
const body: HTMLBodyElement = document.querySelector('body')

const currentThemeColors: ThemeColors = getThemeColors(pageTheme) 
setThemeCssVariables(body, currentThemeColors)

// Theme Controls
const themeControls: HTMLElement = document.querySelector('.calc__theme-controls')
const themeToggler: HTMLInputElement = themeControls.querySelector('.theme-toggler')
themeToggler.addEventListener('input', () => {
    pageTheme = getThemeByIndex(+themeToggler.value) 
    setThemeCssVariables(body, getThemeColors(pageTheme))
})


const themeLabels = themeControls.querySelectorAll('.labels .label')
themeLabels.forEach(item => {
    item.addEventListener('click', () => {
        pageTheme = getThemeByIndex(+item.getAttribute('data-theme-index'))
        setThemeCssVariables(body, getThemeColors(pageTheme))
        themeToggler.value = item.getAttribute('data-theme-index')
    })
})

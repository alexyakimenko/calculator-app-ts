import './main.scss'
import {Theme, ThemeControl} from "./ts/theme"

// Initialize Theme  
const body: HTMLBodyElement = document.querySelector('body')
let themeControl: ThemeControl = new ThemeControl({cssVarElement: body});

// Theme Controls
const themeControls: HTMLElement = document.querySelector('.calc__theme-controls')
const themeToggler: HTMLInputElement = themeControls.querySelector('.theme-toggler')

themeToggler.value = themeControl.getTheme()
themeToggler.addEventListener('input', () => {
    themeControl.setTheme(themeToggler.value as Theme)
})

const themeLabels = themeControls.querySelectorAll('.labels .label')
themeLabels.forEach(item => {
    item.addEventListener('click', () => {
        themeControl.setTheme(item.getAttribute('data-theme-index') as Theme)
        themeToggler.value = item.getAttribute('data-theme-index')
    })
})

// Screen Logic
const screen: HTMLInputElement = document.querySelector(".calc__screen")
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if(event.key.toLowerCase() === "backspace") {
        screen.value = ''
        return
    }
    screen.value += event.key.replace(/\D/g, '')
})
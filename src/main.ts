import './main.scss'
import {Theme, ThemeControl} from "./ts/theme"
import { Calculator } from './ts/calculator'

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


const keys: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.calc__key')
// Screen Logic
const screen: HTMLInputElement = document.querySelector(".calc__screen")
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    console.log(event.key)
    keys.forEach(item => {
        let dataType: string = item.getAttribute('data-type')
        if(dataType === 'number' || dataType === 'f_point') {
            if(item.textContent === event.key) {
                item.click()
                item.style.transform = 'translateY(0.25rem)'
            }
        } else if(dataType === 'operator') {
            if(item.getAttribute('data-op') === event.key) {
                item.click()
                item.style.transform = 'translateY(0.25rem)'
            }
        } else if(dataType === 'action') {
            let dataAction = item.getAttribute('data-action')
            if(dataAction === 'delete' && event.key === 'Backspace') {
               item.click()
               item.style.transform = 'translateY(0.25rem)'
            } else 
            if(dataAction === 'reset' && event.key === 'Escape') {
               item.click()
               item.style.transform = 'translateY(0.25rem)'
            } else
            if(dataAction === 'result' && event.key === 'Enter') {
               item.click()
               item.style.transform = 'translateY(0.25rem)'
            }
        }
    })
})
document.addEventListener('keyup', (event) => {
    event.preventDefault()
    keys.forEach(item => {
        item.removeAttribute('style')
    })
})


// Calc Controls Logic
const calcKeys: HTMLDivElement = document.querySelector(".calc__controls")

let calc = new Calculator(screen)

calcKeys.addEventListener('click', (event) => calc.clickHandler(event.target))
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


const keys: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.calc__key')
// Screen Logic
const screen: HTMLInputElement = document.querySelector(".calc__screen")
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    console.log(event.key)
    keys.forEach(item => {
        let dataType: string = item.getAttribute('data-type')
        if(dataType === 'number') {
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
let calcValue: string = screen.value

screen.addEventListener('input', () => {
    calcValue = screen.value
})
let lastResult: string = '';
calcKeys.addEventListener('click', (event) => {
    if(event.target instanceof Element && event.target.tagName === 'BUTTON') {
        let el: Element = event.target
        let dataType: string = el.getAttribute('data-type')
        let lastChar: string = calcValue[calcValue.length-1] || ''
        if(dataType === 'number') {
            if(calcValue === lastResult) {
                calcValue = '0'
            }
            if(calcValue === 'Infinity') {
                calcValue = '0'                
            }
            if(calcValue === '0') {
                calcValue = el.textContent
            } else {
                if(Number.isNaN(+lastChar) && lastChar !== '.') {
                    calcValue += el.textContent
                } else {

                calcValue += el.textContent
                }
            }
        } else if(dataType === 'f_point') {
            if(calcValue === lastResult) {
                calcValue = '0'
            }
            if(lastChar !== '.') {
                if(!Number.isNaN(+lastChar)) {
                    calcValue += '.'
                } else {
                    calcValue += '0.'
                }
            }
        } else if(dataType === 'operator') {
            let dataOp: string = el.getAttribute('data-op')
            if(calcValue.length === 0 || calcValue === '0') {
                calcValue = `0${dataOp}`
            } else if(lastChar.match(/(\/|\+|\-|\*)/)) {
                calcValue = calcValue.slice(0,-1) + dataOp
            } else {
                calcValue += dataOp
            }

        } else if(dataType === 'action') {
            let dataAction: string = el.getAttribute('data-action')
            if(dataAction === 'reset') {
                calcValue = '0'
            }
            if(dataAction === 'result') {
                if(lastChar.match(/(\/|\+|\-|\*)/)) {
                    calcValue = calcValue.slice(0,-1)
                }
                let result: number = eval(calcValue)
                result = eval(result.toFixed(9).toString())
                if(Number.isNaN(result)) result = 0
                lastResult = result.toString()
                calcValue = result.toString()
            }
            if(dataAction === 'delete') {
                if(calcValue === lastResult) {
                    calcValue = '0'
                }
                if(calcValue === "Infinity") {
                    calcValue = '0'
                } else {
                    calcValue = calcValue.slice(0,-1)
                    if(calcValue.length === 0) {
                        calcValue = '0'
                    }
                }
            }
        }
        screen.value = calcValue
    }
})
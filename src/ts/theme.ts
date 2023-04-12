enum Theme {
    Blue = 'blue',
    Grey = 'grey',
    Violet = 'violet',
}

interface ThemeColors {
    // backgrounds
    main_bg: string,
    toggle_bg: string,
    screen_bg: string,
    // keys
    key_bg: string,
    key_shadow: string,
    action_key_bg: string,
    action_key_shadow: string,
    result_key_bg: string,
    result_key_shadow: string,
    // text
    header_text: string,
    key_text: string,
    action_key_text: string,
    result_key_text: string,

}

const colors: {[key in Theme]?: ThemeColors} = {
    [Theme.Blue]: {
        main_bg: 'hsl(222, 26%, 31%)',
        toggle_bg: 'hsl(223, 31%, 20%)',
        screen_bg: 'hsl(224, 36%, 15%)',
        key_bg: 'hsl(30, 25%, 89%)',
        key_shadow: 'hsl(28, 16%, 65%)',
        action_key_bg: 'hsl(225, 21%, 49%)',
        action_key_shadow: 'hsl(224, 28%, 35%)',
        result_key_bg: 'hsl(6, 63%, 50%)',
        result_key_shadow: 'hsl(6, 70%, 34%)',
        header_text: 'hsl(0, 0%, 100%)',
        key_text: 'hsl(221, 14%, 31%)',
        action_key_text: 'hsl(0, 0%, 100%)',
        result_key_text: 'hsl(0, 0%, 100%)',
    },
    [Theme.Grey]: {
        main_bg: 'hsl(0, 0%, 90%)',
        toggle_bg: 'hsl(0, 5%, 81%)',
        screen_bg: 'hsl(0, 0%, 93%)',
        key_bg: 'hsl(45, 7%, 89%)',
        key_shadow: 'hsl(35, 11%, 61%',
        action_key_bg: 'hsl(185, 42%, 37%',
        action_key_shadow: 'hsl(185, 58%, 25%)',
        result_key_bg: 'hsl(25, 98%, 40%)',
        result_key_shadow: 'hsl(25, 99%, 27%)',
        header_text: 'hsl(60, 10%, 19%)',
        key_text: 'hsl(60, 10%, 19%)',
        action_key_text: 'hsl(0, 0%, 100%)',
        result_key_text: 'hsl(0, 0%, 100%)',
    },
    [Theme.Violet]: {
        main_bg: 'hsl(268, 75%, 9%)',
        toggle_bg: 'hsl(268, 71%, 12%)',
        screen_bg: 'hsl(268, 71%, 12%)',
        key_bg: 'hsl(268, 47%, 21%)',
        key_shadow: 'hsl(290, 70%, 36%)',
        action_key_bg: 'hsl(281, 89%, 26%)',
        action_key_shadow: 'hsl(285, 91%, 52%)',
        result_key_bg: 'hsl(176, 100%, 44%)',
        result_key_shadow: 'hsl(177, 92%, 70%)',
        header_text: 'hsl(52, 100%, 62%)',
        key_text: 'hsl(52, 100%, 62%)',
        action_key_text: 'hsl(0, 0%, 100%)',
        result_key_text: 'hsl(198, 20%, 13%)',
    }
}

function getThemeColors(theme: Theme): ThemeColors {
    return colors[theme]
}

function setThemeCssVariables(element: string | HTMLElement, colors: ThemeColors): void {
    let targetElement: HTMLElement;
    if(typeof element === 'string') {
        targetElement = document.querySelector(element)
    } else {
        targetElement = element
    }

    for(let key in colors) {
        let property = key.replace(/_/g, '-')
        targetElement.style.setProperty(`--${property}`, colors[key])
    }
}

function getThemeByIndex(index: number): Theme {

    switch(index) {
        case 1:
            return Theme.Blue
        case 2:
            return Theme.Grey
        case 3:
            return Theme.Violet
    }
}

export {
    Theme,
    ThemeColors,
    getThemeColors,
    setThemeCssVariables,
    getThemeByIndex,
}
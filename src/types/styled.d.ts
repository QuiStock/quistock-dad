import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      main: string
    }
    colors: {
      white: string
      white100: string
      selected: string
      black: string
      darkGray: string
      gray: string
      gray300: string
      gray700: string
      lightGray: string
      lightGray1: string
      lightGray2: string
      lightGray3: string
      lightGray4: string
      progressBarBG: string
      red: string
      blue: string
      blueInfoBackground: string
      blueInfoText: string
      blueIcons: string
      blueIcons2: string
      blueIcons3: string
      lightBlue: string
      lightBlue1: string
      lightBlue2: string
      darkBlue: string
      darkBlue2: string
      golden: string
      orange: string
      tabsIndicator: string
      buttonColor: string
      buttonBackground: string
      green: string
      green2: string
    }
    boxShadow: {
      main: string
    }
    font: {
      size: {
        minimum: string
        medium: string
        base: string
        body1: string
        body2: string
        pageTab: string
        subtitle: string
        title: string
        bigTitle: string
        xlTitle: string
      }
      family: {
        base: string
        title: string
        alternative: string
        cursive: string
      }
      colors: {
        main: string
        dark: string
        dark2: string
        error: string
        warning: string
        warning2: string
        success: string
        check: string
        info: string
        info2: string
        title: string
        title2: string
      }
    }
    screen: {
      xlarge: string
      large: string
      medium: string
      small: string
      xsmall: string
    }
    spacing: {
      minimum: string
      base: string
      big: string
      maximum: string
    }
  }
}

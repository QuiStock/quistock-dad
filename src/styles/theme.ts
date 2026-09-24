// MODULE
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

// THEME
const theme = {
  borderRadius: {
    main: '0.8rem',
  },
  colors: {
    white: '#FFFFFF',
    white100: '#F2F2F2',
    selected: '#E6EFF9',
    black: '#000000',
    darkGray: '#4C4C4C',
    gray: '#CCCCCC',
    gray300: '#B6B6B6',
    gray700: '#374151',
    lightGray: '#FAFAFA',
    lightGray1: '#FAFAFA',
    lightGray2: '#F8F8F8',
    lightGray3: '#ECECEC',
    lightGray4: '#5D5D5F',
    progressBarBG: '#D1D3D4',
    red: '#D32F2F',
    blue: '#0091ff',
    blueInfoBackground: '#EBF6FC',
    blueInfoText: '#0288D1',
    blueIcons: '#2196F3',
    blueIcons2: '#41CDF5',
    blueIcons3: '#1EAAF5',
    lightBlue: '#7F3AEF',
    lightBlue1: '#1EAAF5',
    lightBlue2: '#E1E6F5',
    darkBlue: '#AF36DF',
    darkBlue2: '#083365',
    golden: '#FF9800',
    orange: '#ED6C02',
    tabsIndicator: '#AF36DF',
    buttonColor: '#AF36DF',
    buttonBackground: '#F7F9FD',
    purple: '#7623E1',
    pink: '#DC4B93',
    green: '#91D700',
    green2: '#4CAF50',
    green3: '#05B49C',
    green4: '#95AF11',
  },
  boxShadow: {
    main: '0 0.2rem 0.4rem 0 #23237840',
  },
  font: {
    size: {
      minimum: '1rem',
      medium: '1.2rem',
      base: '1.4rem',
      body1: '1.6rem',
      body2: '1.8rem',
      pageTab: '2rem',
      subtitle: '2.2rem',
      title: '2.4rem',
      bigTitle: '3rem',
      xlTitle: '4rem',
    },
    family: {
      base: 'JBS Text, sans-serif',
      title: 'Display font, sans-serif',
      alternative: 'Roboto, sans-serif',
      cursive: 'Style Script, cursive',
    },
    colors: {
      main: '#5D5D5F',
      dark: '#505050',
      dark2: '#383838',
      error: '#FF5252',
      warning: '#653C01',
      warning2: '#0288D1',
      success: '#1D4620',
      check: '#4CAF50',
      info: '#024360',
      info2: '#10284A',
      title: '#232378',
      title2: '#14143C',
    },
  },
  screen: {
    xlarge: '1600px',
    large: '1280px',
    medium: '980px',
    small: '767px',
    xsmall: '540px',
  },
  spacing: {
    minimum: '0.8rem',
    base: '1.6rem',
    big: '2.4rem',
    maximum: '3.2rem',
  },
}

export default theme

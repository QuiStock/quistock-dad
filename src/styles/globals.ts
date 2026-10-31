import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyles = createGlobalStyle`
    *:focus:not(:focus-visible),
    input:focus-visible,
    textarea:focus-visible {
      outline: none;
    }

    :where(a, button, [role='button'], [tabindex]):focus-visible {
      outline: 2px solid ${theme.colors.lightBlue};
      outline-offset: 2px;
    }

    :where(.Mui-focusVisible):not(.MuiMenuItem-root) {
      outline: 2px solid ${theme.colors.lightBlue};
      outline-offset: 2px;
    }

    header :where(a, button, [role='button'], [tabindex]):focus-visible,
    .MuiDrawer-paper :where(a, button, [role='button'], [tabindex]):focus-visible {
      outline-color: #d8b4fe;
    }

    .MuiMenu-paper [role='menuitem']:focus-visible {
      outline: 2px solid ${theme.colors.lightBlue};
      outline-offset: -2px;
    }

    * {
      font-size: 1.4rem;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
            
      &::before,
      &::after {
        box-sizing: inherit;
      }

      /* Firefox */
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.lightBlue} ${theme.colors.lightGray3};

      /* Chrome, Edge, and Safari */
      &::-webkit-scrollbar {
        width: 0.5rem;
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.lightGray3};

      }

      &::-webkit-scrollbar-thumb {
        background-color: ${theme.colors.gray};
        border-radius: 0.5rem;
        opacity: 0.1;
        
        &:hover{
          background-color: ${theme.colors.lightBlue};
        }
      }

      /* Buttons */
      ::-webkit-scrollbar-button:single-button {
        background-color: ${theme.colors.lightGray3};
        display: block;
        border-style: solid;
        height: 0.5rem;
        width: 0.5rem;
      }

      /* Up */
      ::-webkit-scrollbar-button:single-button:vertical:decrement {
        border-width: 0 0.25rem 0.25rem 0.25rem;
        border-color: transparent transparent ${theme.colors.gray700} transparent;
        &:hover {
          border-color: transparent transparent ${theme.colors.lightBlue} transparent;
        }
      }

      /* Down */
      ::-webkit-scrollbar-button:single-button:vertical:increment {
        border-width: 0.25rem 0.25rem 0 0.25rem;
        border-color: ${theme.colors.gray700} transparent transparent transparent;
        &:hover {
          border-color: ${theme.colors.lightBlue} transparent transparent transparent;
        }
      }
    }
    html {
      font-size: 62.5%;
      background-color: ${theme.colors.lightGray1};
    }

    body {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.title2};
      text-rendering: optimizeLegibility;

      main {
        padding-top: 8.8rem;
        min-height: 100vh;
      }
    }



    ::selection {
      background-color: ${theme.colors.brandTint};
      color: ${theme.colors.brandInk};
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        transition-property: opacity, color, background-color, border-color !important;
        scroll-behavior: auto !important;
      }
    }

    .MuiPickersDay-root {
      font-size: ${theme.font.size.minimum}
    }

    .MuiDataGrid-panel {
      .MuiDataGrid-paper {
        .MuiInputLabel-formControl,
        .MuiInputBase-input {
          font-size: ${theme.font.size.minimum};
        }
        .MuiDataGrid-panelContent {
          .MuiTypography-root {
            font-size: ${theme.font.size.minimum};
          }
        }
        .MuiDataGrid-panelFooter {
          .MuiButtonBase-root {
            font-size: ${theme.font.size.minimum};
          }
        }
      }
    }
  `

export default GlobalStyles

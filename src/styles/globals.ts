import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
    * {
      font-size: 1.4rem;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      outline: none;
            
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

      @media (max-width: ${theme.screen.medium}) {
        font-size: 44.5%;
      }
    }
    body {
      main {
        padding-top: 8.8rem;
        min-height: 100vh;
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
  `;

export default GlobalStyles;

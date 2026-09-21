import styled, { css } from "styled-components";

import Snackbar from "@mui/material/Snackbar";
import { Alert as MuiAlert } from "@mui/material";

export const Wrapper = styled(Snackbar)(
  () => css`
    && {
      position: relative;
      top: unset;
      left: unset;
      bottom: unset;
      right: unset;
    }
  `
);

export const Alert = styled(MuiAlert)(
  ({ theme }) => css`
    && {
      width: 100%;
      min-height: fit-content;
      font-family: ${theme.font.family.base};
      padding: 1.6rem;
      gap: 0.8rem;

      && > div {
        min-height: 100%;
        display: flex;
        align-items: center;
        padding: 0;
      }
    }
  `
);

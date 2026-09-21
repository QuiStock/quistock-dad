import * as S from "./styles";
import { type ButtonProps } from "@mui/material";

const ButtonComponent = (props: ButtonProps) => (
  <S.Wrapper data-testid="button" {...props}>
    <p>{props.children}</p>
  </S.Wrapper>
);

export { ButtonComponent };

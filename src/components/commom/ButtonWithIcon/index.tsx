import { type ReactNode } from "react";
import * as S from "./styles";
import { type ButtonProps } from "@mui/material";

export interface IButtonWithIconProps extends ButtonProps {
  children: string | ReactNode;
  icon: ReactNode;
  isEndIcon?: boolean;
  height?: string;
}

const ButtonWithIcon = (props: IButtonWithIconProps) => (
  <>
    <S.Wrapper
      {...props}
      height={props?.height}
      startIcon={(!props.isEndIcon && props.icon) || undefined}
      endIcon={(props.isEndIcon && props.icon) || undefined}
    >
      {props.children}
    </S.Wrapper>
  </>
);

export { ButtonWithIcon };

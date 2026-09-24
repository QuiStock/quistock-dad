import { type TextFieldProps } from "@mui/material";
import * as S from "./styles";

const TextInputComponent = (props: TextFieldProps) => (
  <S.TextInput {...props} />
);

export { TextInputComponent };

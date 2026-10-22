export interface IApiErrorResponse {
  error?: string
  message: string
  errors?: { [key: string]: string }
}

const verifyCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/[^\d]+/g, '')
  if (cleanCPF.length !== 11 || /(\d)\1{10}/.exec(cleanCPF) !== null)
    return false
  const splittedCPF = cleanCPF.split('')

  const validator = splittedCPF
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map((el) => +el)

  const toValidate = (pop: number) =>
    splittedCPF
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map((el) => +el)

  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10

  return rest(10, 2) === validator[0]
}

export default verifyCPF

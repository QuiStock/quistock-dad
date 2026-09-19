const verifyEmail = (email: string) => {
  const re = /^\S+@\S+\.\S+$/
  return re.test(String(email).toLowerCase())
}

export default verifyEmail

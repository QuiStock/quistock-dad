const SUPPORT_EMAIL = 'quistockinterdisciplinar@gmail.com'

export const buildSupportMailto = (subject: string, body: string): string =>
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`

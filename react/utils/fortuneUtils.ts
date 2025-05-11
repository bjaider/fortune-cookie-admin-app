export const generateLuckyNumber = (): string => {
  const randomDigits = (count: number) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join('')

  return `${randomDigits(2)}-${randomDigits(2)}-${randomDigits(4)}`
}

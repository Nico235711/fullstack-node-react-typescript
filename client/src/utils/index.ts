export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  }).format(amount)
}

export const toBoolean = (str: string) => {
  return str.toLowerCase() === "true"
}
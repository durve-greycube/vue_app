export function formattedCurrency(amount, currency) {
    return new Intl.NumberFormat("en-IN", {style: "currency", currency: currency }).format(amount)
}
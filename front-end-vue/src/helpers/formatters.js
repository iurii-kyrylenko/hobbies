export const formatDate = (date) => {
  if (!date) return 'Invalid date'

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return `${months[month]} ${day}, ${year}`
}

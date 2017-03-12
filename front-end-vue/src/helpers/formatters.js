export const formatDate = (date) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  if (!date) return 'Invalid date'
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${months[month]} ${day}, ${year}`
}

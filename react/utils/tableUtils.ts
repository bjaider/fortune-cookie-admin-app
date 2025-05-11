export const getFontSize = (tableDensity: 'low' | 'medium' | 'high') => {
  switch (tableDensity) {
    case 'medium':
      return 'f6'
    case 'high':
      return 'f7'
    default:
      return 'f5'
  }
}

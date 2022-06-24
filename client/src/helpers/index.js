const getPercent = (value1, value2) => {
  return value2 ? (value1 / value2 * 100).toFixed(2) + '%' : window.DASH;
}

const getScore = (value1, value2) => {
  return value2 ? `${value1 || 0}/${value2}` : window.DASH;
}

const getFullScore = (value1, value2) => {
  return value2 ? `${value1 || 0}/${value2} (${(value1 / value2 * 100).toFixed(2)}%)` : window.DASH;
}

export {
  getPercent,
  getScore,
  getFullScore
}
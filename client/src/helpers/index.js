const getPercent = (value1, value2) => {
  return value1 && value2 ? (value1 / value2 * 100).toFixed(2) + '%' : window.DASH;
}

export {
  getPercent
}
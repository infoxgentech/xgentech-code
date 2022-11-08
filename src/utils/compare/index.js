const objectCompare = (obj1, obj2) => {
  const k1 = Object.keys(obj1)
  const k2 = Object.keys(obj2)
  if (k1.length !== k2.length) return false
  return k1.every(key => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return objectCompare(obj1[key], obj2[key])
    }
    return obj1[key] === obj2[key]
  })
}

export { objectCompare }

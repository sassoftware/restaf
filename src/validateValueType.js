function validateValueType(value, colType) {
  if (colType === 'array') {
    return value == null ? false : Array.isArray(value);
  }
  if (colType === 'object') {
    return value === null ? false : typeof value === 'object';
  }

  return value === null ? true : typeof value === colType;
}
export default validateValueType;
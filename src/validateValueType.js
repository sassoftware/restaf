function validateValueType(value, colType) {
  if (value == null) {
    return true;
  }
  if (colType === 'array') {
    return Array.isArray(value);
  }
  if (colType === 'object') {
    return  typeof value === 'object';
  }

  return typeof value === colType;
}
export default validateValueType;
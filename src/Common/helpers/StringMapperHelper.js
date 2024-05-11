function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = snakeToCamel(key);
      const value = obj[key];
      if (value instanceof Date) {
        acc[camelKey] = value;
      } else {
        acc[camelKey] = convertKeysToCamelCase(value);
      }
      return acc;
    }, {});
  }
  return obj;
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

module.exports = { convertKeysToCamelCase, camelToSnake };

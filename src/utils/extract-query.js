export function extractQueryParams(query) {
  const params = new URLSearchParams(query);

  return Array.from(params.entries()).reduce((obj, param) => {
    const [key, value] = param;
    obj[key] = value;

    return obj;
  }, {});
}

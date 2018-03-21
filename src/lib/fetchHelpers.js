const handleFetchErrors = res => {
  if (!res.ok) {
    return res.json()
    .catch(() => {
      throw Error(res.statusText)
    })
    .then(({ message }) => {
      throw Error(message || res.statusText)
    });
  }
  return res;
}

export const fetchJSON = (url, options) => {
  return fetch(url, options)
  .then(handleFetchErrors)
  .then(res => res.json())
}

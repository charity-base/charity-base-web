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
  return res
}

const fetchJSON = (url, options) => {
  return fetch(url, options)
  .then(handleFetchErrors)
  .then(res => res.json())
}

const fetchBlob = (url, options) => {
  return fetch(url, options)
  .then(handleFetchErrors)
  .then(res => res.blob())
}

export { fetchJSON, fetchBlob }

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

const authOptions = (options, token) => ({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  },
})

const fetchBlob = (url, options={}, sendToken=true) => {
  const token = sendToken && localStorage.getItem('access_token')
  const opts = token ? authOptions(options, token) : options
  return fetch(url, opts)
  .then(handleFetchErrors)
  .then(res => res.blob())
}

export { fetchBlob }

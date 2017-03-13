const uploadRequest = (url, file, headers) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    const xhr = new XMLHttpRequest()
    formData.append('upload', file, file.name)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }
    }

    xhr.open('POST', url, true)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(formData)
  })
}

export { uploadRequest }

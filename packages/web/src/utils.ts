export function getBase64(img) {
  const reader = new FileReader()
  const promise = new Promise((resolve, _reject) =>
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
  )

  reader.readAsDataURL(img)
  return promise
}

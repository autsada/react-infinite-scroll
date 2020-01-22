const posts = new Array(50)
  .fill("Lorem ipsum dolor sit amet consectetur.")
  .map((v, i) => `${i + 1}: ${v}`)

export const api = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(posts)
    }, 5000)
  })
}

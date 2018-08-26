window.onload = () => {
  const $form = document.getElementById('data-form')
  const $input = document.getElementById('data-input')
  const $shortUrl = document.getElementById('data-shorturl')

  $form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    const url = $input.value

    axios({
      method: 'post',
      url: '/api/shorturl/new',
      'Content-Type': 'multipart/form-data',
      data: { url }
    }).then(response => {
      const data = JSON.parse(response.data)
      const { original_url, short_url } = data
      const html = `
        <p>Original URL: ${original_url}</p>
        <p>Short URL: <a href="/api/shorturl/${short_url}" target="_blank">/api/shorturl/${short_url}</a></p>
      `
      $shortUrl.innerHTML = html
    }).catch(err => {
      console.log('err', err)
      $shortUrl.innerText = 'Sorry, somthing went wrong. Please try again.'
    })
  })
}
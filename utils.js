const dns = require('dns')

const URLRegex = /(https?:\/\/)*(www\.)*(\w+)\.(\w{2,3})(\/\w+)*/g

const validateUrl = (url) => {
  return new Promise((res, rej) => {
    const matches = URLRegex.exec(url)

    if ( matches === null ) {
      return rej('url did not match regex')
    }

    let hostname = url
    if ( matches[1] ) {
      hostname = hostname.slice(matches[1].length)
    }
    if ( matches[2] ) {
      hostname = hostname.slice(matches[2].length)
    }
    
    return dns.lookup(hostname, err => {
      if ( err ) {
        console.log('dns lookup error')
        return rej(err)
      }
      return res(true)
    })
  })
}

const generateShortUrl = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@#'
  const shortUrlChars = []
  for ( let i = 0; i < 5; i++ ) {
    const randomCharIdx = Math.floor(Math.random() * characters.length)
    shortUrlChars.push(characters.charAt(randomCharIdx))
  }
  return shortUrlChars.join('')
}

module.exports = { validateUrl, generateShortUrl }
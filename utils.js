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
        return rej(error)
      }
      return res(true)
    })
  })
}


module.exports = { validateUrl }
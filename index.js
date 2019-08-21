const psl = require('psl')

function parseDomain (url) {
  if (!url) return null
  const hostname = url.replace(/^((http(s)?:)?\/\/)?/, '').replace(/([/?].*)$/, '')
  const parsed = psl.parse(hostname)
  return {
    domain: parsed.sld,
    subdomain: parsed.subdomain,
    tld: parsed.tld
  }
}

parseDomain.toDomain = (url) => {
  const pd = parseDomain(url)
  if (!pd) return null
  if (!pd.tld) return null
  return [pd.domain, pd.tld].filter(v => v).join('.')
}

parseDomain.toHostname = (url) => {
  const pd = parseDomain(url)
  if (!pd) return null
  if (!pd.tld) return null
  return [pd.subdomain, pd.domain, pd.tld].filter(v => v).join('.')
}

module.exports = parseDomain

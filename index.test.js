const test = require('ava')
const parseDomain = require('./index')

test('it works for undefined / null / empty string', t => {
  t.deepEqual(parseDomain(''), null)
  t.deepEqual(parseDomain(), null)
  t.deepEqual(parseDomain(null), null)
})

test('it works for subdomains', t => {
  t.deepEqual(
    parseDomain('www.example.com'),
    { tld: 'com', domain: 'example', subdomain: 'www' }
  )
})

test('it works for domains', t => {
  t.deepEqual(
    parseDomain('example.com'),
    { tld: 'com', domain: 'example', subdomain: null }
  )
})

test('it works with urls', t => {
  t.deepEqual(
    parseDomain('example.com/about'),
    { tld: 'com', domain: 'example', subdomain: null }
  )
  t.deepEqual(
    parseDomain('https://www.example.com/about'),
    { tld: 'com', domain: 'example', subdomain: 'www' }
  )
  t.deepEqual(
    parseDomain('http://www.something.co.uk?what-about-this=1'),
    { tld: 'co.uk', domain: 'something', subdomain: 'www' }
  )
  t.deepEqual(
    parseDomain('//www.something.co.uk'),
    { tld: 'co.uk', domain: 'something', subdomain: 'www' }
  )
})

test('test@example.com', t => {
  t.deepEqual(
    parseDomain('test@example.com'),
    { tld: 'com', domain: 'example', subdomain: null }
  )
})


test('mailto:test@example.com', t => {
  t.deepEqual(
    parseDomain('mailto:test@example.com'),
    { tld: 'com', domain: 'example', subdomain: null }
  )
})

test('*.gov.uk', t => {
  t.deepEqual(
    parseDomain('www.gov.uk'),
    { tld: 'gov.uk', domain: 'www', subdomain: null }
  )
  t.deepEqual(
    parseDomain('hmrc.gov.uk'),
    { tld: 'gov.uk', domain: 'hmrc', subdomain: null }
  )
  t.deepEqual(
    parseDomain('gov.uk'),
    { tld: 'gov.uk', domain: null, subdomain: null }
  )
})

test('*.police.uk', t => {
  t.deepEqual(
    parseDomain('police.uk'),
    { tld: 'police.uk', domain: null, subdomain: null }
  )
  t.deepEqual(
    parseDomain('academy.cityoflondon.police.uk'),
    { tld: 'police.uk', domain: 'cityoflondon', subdomain: 'academy' }
  )
})

test('*.co.uk', t => {
  t.deepEqual(
    parseDomain('www.riskxchange.co.uk'),
    { tld: 'co.uk', domain: 'riskxchange', subdomain: 'www' }
  )
})

test('*.herokuapp.com', t => {
  t.deepEqual(
    parseDomain('a834798389x794k.herokuapp.com'),
    { tld: 'herokuapp.com', domain: 'a834798389x794k', subdomain: null }
  )
  t.deepEqual(
    parseDomain('herokuapp.com'),
    { tld: 'herokuapp.com', domain: null, subdomain: null }
  )
})

test('*.uk.net', t => {
  t.deepEqual(
    parseDomain('johnstone.uk.net'),
    { tld: 'uk.net', domain: 'johnstone', subdomain: null }
  )
  t.deepEqual(
    parseDomain('www.johnstone.uk.net'),
    { tld: 'uk.net', domain: 'johnstone', subdomain: 'www' }
  )
})

test('.toDomain', t => {
  t.is(parseDomain.toDomain(''), null)
  t.is(parseDomain.toDomain(undefined), null)
  t.is(parseDomain.toDomain(null), null)
  t.is(parseDomain.toDomain('www.example.com'), 'example.com')
  t.is(parseDomain.toDomain('example.com'), 'example.com')
  t.is(parseDomain.toDomain('example.com/about'), 'example.com')
  t.is(parseDomain.toDomain('https://www.example.com/about'), 'example.com')
  t.is(parseDomain.toDomain('http://www.something.co.uk?what-about-this=1'), 'something.co.uk')
  t.is(parseDomain.toDomain('//www.something.co.uk'), 'something.co.uk')
  t.is(parseDomain.toDomain('www.gov.uk'), 'www.gov.uk')
  t.is(parseDomain.toDomain('hmrc.gov.uk'), 'hmrc.gov.uk')
  t.is(parseDomain.toDomain('gov.uk'), 'gov.uk')
  t.is(parseDomain.toDomain('police.uk'), 'police.uk')
  t.is(parseDomain.toDomain('academy.cityoflondon.police.uk'), 'cityoflondon.police.uk')
  t.is(parseDomain.toDomain('www.riskxchange.co.uk'), 'riskxchange.co.uk')
  t.is(parseDomain.toDomain('a834798389x794k.herokuapp.com'), 'a834798389x794k.herokuapp.com')
  t.is(parseDomain.toDomain('herokuapp.com'), 'herokuapp.com')
  t.is(parseDomain.toDomain('johnstone.uk.net'), 'johnstone.uk.net')
  t.is(parseDomain.toDomain('www.johnstone.uk.net'), 'johnstone.uk.net')
})

test('.toHostname', t => {
  t.is(parseDomain.toHostname(''), null)
  t.is(parseDomain.toHostname(undefined), null)
  t.is(parseDomain.toHostname(null), null)
  t.is(parseDomain.toHostname('www.example.com'), 'www.example.com')
  t.is(parseDomain.toHostname('example.com'), 'example.com')
  t.is(parseDomain.toHostname('example.com/about'), 'example.com')
  t.is(parseDomain.toHostname('https://www.example.com/about'), 'www.example.com')
  t.is(parseDomain.toHostname('http://www.something.co.uk?what-about-this=1'), 'www.something.co.uk')
  t.is(parseDomain.toHostname('//www.something.co.uk'), 'www.something.co.uk')
  t.is(parseDomain.toHostname('www.gov.uk'), 'www.gov.uk')
  t.is(parseDomain.toHostname('gov.uk'), 'gov.uk')
  t.is(parseDomain.toHostname('police.uk'), 'police.uk')
  t.is(parseDomain.toHostname('academy.cityoflondon.police.uk'), 'academy.cityoflondon.police.uk')
  t.is(parseDomain.toHostname('www.riskxchange.co.uk'), 'www.riskxchange.co.uk')
  t.is(parseDomain.toHostname('a834798389x794k.herokuapp.com'), 'a834798389x794k.herokuapp.com')
  t.is(parseDomain.toHostname('herokuapp.com'), 'herokuapp.com')
  t.is(parseDomain.toHostname('johnstone.uk.net'), 'johnstone.uk.net')
  t.is(parseDomain.toHostname('www.johnstone.uk.net'), 'www.johnstone.uk.net')
})

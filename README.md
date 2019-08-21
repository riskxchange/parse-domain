# @riskxchange/parse-domain

## Installation

```js
npm i riskxchange/@riskxchange/parse-domain
```

## Usage

```js
const pd = require('@riskxchange/parse-domain')

const res = pd('https://www.example.com')

// res === { tld: 'com', domain: 'example', subdomain: 'www' }
```

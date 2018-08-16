const getDomainNames = async (client, endpoint) => {
  const domains = {}
  let url = endpoint
  while(url) {
    const result = await client
      .api(url)
      .query("$search=unsubscribe")
      .select('from')
      .top(1000)
      .get();
    const reducer = (accumulater, value) => {
      if (!value || !value.from) {
        return accumulater
      }
      const { address } = value.from.emailAddress
      if (!address) {
        return accumulater
      }
      const domain = address.split('@')[1]
      if (!domain) {
        return accumulater
      }

      const domainName = domain.toLowerCase()
      accumulater[domainName] = domainName
      return accumulater
    }
    result.value.reduce(reducer, domains)

    url = result['@odata.nextLink'] || ''
  }

  const domainNames = Object.keys(domains).sort()
  return domainNames
}

module.exports = getDomainNames

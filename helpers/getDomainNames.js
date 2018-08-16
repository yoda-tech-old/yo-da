const getDomainNames = (itemList) => {
  const reducer = (accumulater, value, index, array) => {
    const domain = value.from.emailAddress.address.split('@')[1]
    accumulater[domain] = true
    return accumulater
  }
  const domainList = Object.keys(itemList.reduce(reducer, {})).sort()
  return domainList
}

module.exports = getDomainNames

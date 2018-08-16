

function getCompany(input) {
  output = input.split("@").pop();
  return output;
}

exports.getCompany = getCompany;

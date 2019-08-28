// zeebraMuffin becomes ZeebraMuffin
const capitalizeFirstLetter = (string) => {
  if (!string || !string.length) {
    return string
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

// zeebraMuffin becomes zeebra-muffin
const mapToSnakeCase = (string) => {
  if (!string || !string.length) {
    return string
  }

  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// zeebraMuffin becomes ZEEBRA_MUFFIN
const mapToUnderbarsAllCaps = (string) => {
  if (!string || !string.length) {
    return string
  }

  return string.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
}

// zeebraMuffin becomes Zeebra Muffin
const mapToLabel = (string) => {
  return capitalizeFirstLetter(string).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
}

module.exports = {
  capitalizeFirstLetter,
  mapToSnakeCase,
  mapToUnderbarsAllCaps,
  mapToLabel
}

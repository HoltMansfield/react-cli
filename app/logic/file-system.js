const rek = require('rekuire')
const fs = require('fs').promises
const fsOG = require('fs')
const fsEXTRA = require('node-fs-extra')
const lineReader = require('line-reader')
const messages = rek('messages')


const deleteFile = async (path) => {
  try {
    return await fs.unlink(path)
  } catch (e) {
    // die silently
    return
  }
}

const writeFile = (destinationPath, content) => {
  return fs.writeFile(destinationPath, content)
}

const readFile = (path) => {
  return fs.readFile(path)
}

const makeDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fsOG.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err)
      }

      resolve(path)
    })
  })
}

// If the parent directory does not exist, it's created
const outputFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fsEXTRA.outputFile(path, data, (err) => {
      if (err) {
        reject(err)
      }

      resolve(path)
    })
  })
}

// takes a path and returns array of [{ text: line},...]
const getLines = (path) => {
  return new Promise((resolve) => {
    const data = []

    lineReader.eachLine(path, function(line, last) {
      data.push({
        text: line
      })

      if (last) {
        resolve(data)
      }
    })
  })
}

const insertAtTag = (lines, tag, text) => {
  const newLine = {
    text
  }
  const insertIndex = lines.findIndex(line => line.tag === tag)
  lines.splice(insertIndex, 0, newLine)
}

const tagLine = (lines, tag, condition, relationToCondition) => {
  const indexOf = lines.findIndex(line => line.text.trim() === condition)
  lines[indexOf + relationToCondition] = {
    tag,
    text: lines[indexOf + relationToCondition].text
  }
}

const alphabetizeExports = (lines) => {
  const startIndex = lines.findIndex(line => line.tag === 'start')
  const endIndex = lines.findIndex(line => line.tag === 'end')
  const numberOfLines = endIndex - startIndex + 1
  const linesToSort = lines.splice(startIndex, numberOfLines)
  let mapped = linesToSort.map(line => line.text.trim())
  mapped.sort()
  // filter out any empty lines
  mapped = mapped.filter(x => x.length)
  const mappedBack = mapped.map(text => ({ tag: 'alpha', text: `\t${text}` }))
  lines.splice(startIndex, 0, ...mappedBack)
}

const alphabetizeImports = (lines, leading) => {
  const startIndex = lines.findIndex(line => line.text.indexOf('import/prefer-default-export') !== -1)
  const endIndex = lines.findIndex(line => line.text.trim().length === 0)
  let numberOfLines = endIndex - startIndex
  const linesToSort = lines.splice(startIndex, numberOfLines)

  let mapped = linesToSort.map(line => {
    const withoutLeadingSegment = line.text.replace(leading,'')
    const importName = withoutLeadingSegment.split(' ')[0]

    return {
      ...line,
      // create a mapping so we can reconcile after sorting
      shortText: importName
    }
  })
  // an array with just strings is sortable
  let sortable = mapped.map(line => line.shortText)
  sortable.sort()
  // filter out any empty lines
  sortable = sortable.filter(x => x.length)
  const sorted = []

  // now we have one array of just strings that is sorted
  // create a new array with data from mapped in the order of sortable
  for (let importName of sortable) {
    const nextImport = mapped.find(line => {
      return line.shortText === importName
    })
    sorted.push(nextImport)
  }
  lines.splice(0, 0, ...sorted)
}

/* eslint max-statements: "off" */
const alphabetizeReducerImports = (lines, leading, type) => {
  let startIndex = lines.findIndex(
    line => line.text.indexOf('// reducers from this project') !== -1
  )
  let endIndex = lines.findIndex(
    line => line.text.indexOf('// end of reducers from this project') !== -1
  )
  // add one to get the next line
  startIndex++
  // subtract one to get the line above
  endIndex--
  let numberOfLines = (endIndex - startIndex) +1
  const linesToSort = lines.splice(startIndex, numberOfLines)

  let mapped = linesToSort.map(line => {
    const withoutLeadingSegment = line.text.replace(leading,'')
    const importName = withoutLeadingSegment.split(' ')[0]

    return {
      ...line,
      // create a mapping so we can reconcile after sorting
      shortText: importName
    }
  })

  // an array with just strings is sortable
  let sortable = mapped.map(line => line.shortText)
  // filter out any empty lines
  sortable = sortable.filter(x => x.length)
  sortable.sort()
  const sorted = []

  // now we have one array of just strings that is sorted
  // create a new array with data from mapped in the order of sortable
  for (let importName of sortable) {
    const nextImport = mapped.find(line => {
      return line.shortText === importName
    })
    if (nextImport) {
      sorted.push(nextImport)
    }
  }
  lines.splice(startIndex, 0, ...sorted)
}

const insertBelowGeneratorTag = (lines, generatorToken, newText) => {
  const index = lines.findIndex(line => line.text === generatorToken)
  // insert AFTER found index and thus BELOW
  lines.splice(index, 0, {
    tag: generatorToken,
    text: newText
  })
}

const insertAtGeneratorTag = (lines, generatorToken, newText) => {
  const index = lines.findIndex(line => line.text.indexOf(generatorToken) !== -1)
  // overwrite the line that has the token with new object
  lines[index] = {
    tag: generatorToken,
    text: newText
  }
}

module.exports = {
  deleteFile,
  writeFile,
  readFile,
  makeDirectory,
  outputFile,
  getLines,
  insertAtTag,
  alphabetizeExports,
  tagLine,
  alphabetizeImports,
  alphabetizeReducerImports,
  insertBelowGeneratorTag,
  insertAtGeneratorTag
}

var ChangesStream = require('changes-stream')
var changes = new ChangesStream({
  include_docs: true,
  db: 'https://skimdb.npmjs.com/registry'
})

var packageCount = 0
var licensedCount = 0

changes.on('readable', function () {
  var change = changes.read()

  if (change.doc && change.doc.versions && change.doc['dist-tags'] && change.doc['dist-tags'].latest) {
    var latest = change.doc.versions[change.doc['dist-tags'].latest]
    if (latest.licenses && latest.licenses.length) licensedCount++
    packageCount ++
    console.log(licensedCount + ' / ' + packageCount + ' have license')
  }
})

var gulp = require('gulp');
var sheets = require('stream-google-spreadsheet');
var es = require('vinyl-elasticsearch');

gulp.task('sheetsToEs', function() {
  return sheets.src(
    process.env.SPREADSHEET_KEYS.split(','),
    {
      clientEmail: process.env.SPREADSHEET_CLIENT_EMAIL,
      privateKey: process.env.SPREADSHEET_PRIVATE_KEY
    }
  )
    .map(function(file) {
      var data = file.data;
      var url =
        (data.location || data.organization || '') +
        '/' +
        data.type + '/' +
        ((data.startDate) ? (data.startDate.replace(/-/g, '/') + '/') : '') +
        (data.legalName || data.name)
          .toLowerCase()
          .replace(/ /g, '-');

      file.path = data.url = url;
      return file;
    })
    .pipe(es.dest({
        index: process.env.ELASTICSEARCH_INDEX
      },
      {
        host: process.env.ELASTICSEARCH_HOST,
        requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
        rateLimit: process.env.ELASTICSEARCH_RATE_LIMIT
      }
    ))
    ;
});

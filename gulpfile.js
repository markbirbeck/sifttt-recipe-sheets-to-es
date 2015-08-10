var gulp = require('gulp');
var sheets = require('stream-google-spreadsheet');
var es = require('vinyl-elasticsearch');

gulp.task('sheets-to-es', function() {
  return sheets.src(
    process.env.SPREADSHEET_KEYS.split(','),
    {
      clientEmail: process.env.SPREADSHEET_CLIENT_EMAIL,
      privateKey: process.env.SPREADSHEET_PRIVATE_KEY
    }
  )
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
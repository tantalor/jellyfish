var MY_CLICKED_EVENT = 0;
var MY_OTHER_EXECUTED_BLOOM = 0;
var MY_REGEX_BLOOM = 0;
var MY_STRING_FORMAT_BLOOM = 0;
var MY_WRONG_STRING_FORMAT_BLOOM = 0;

// stub out the getPathName method so we can test a particular URL
Jellyfish.getPathName = function () {
  return "/foo/bar/13";
}

var JellyfishApp = Jellyfish(function () {
  this.bloom('/other_page', function (params) {
    MY_OTHER_EXECUTED_BLOOM = 1;
  });

  this.bloom(/^\/foo/, function (params) {
    MY_REGEX_BLOOM = 1;
    this.sting("#test_link/click", function () {
      MY_CLICKED_EVENT = 1;
    });
  });

  this.bloom('/foo/bar/:id', function (params) {
    MY_STRING_FORMAT_BLOOM = 1;
  });

  this.bloom('/foo/bar/13/:id', function (params) {
    MY_WRONG_STRING_FORMAT_BLOOM = 1;
  });
});

var context = jqUnit.context;
var equals = jqUnit.equals;
context('Jellyfish', 'bare initializer', {
  before: function () {}
}).
should('not execute a bloom with a non-matching string', function () {
  equals(MY_OTHER_EXECUTED_BLOOM, 0);
}).
should('execute the correct bloom for a regex matcher', function () {
  equals(MY_REGEX_BLOOM, 1);
}).
should('execute the correct bloom for a matching string format', function () {
  equals(MY_STRING_FORMAT_BLOOM, 1);
}).
should('not execute the a bloom with non-matching string format', function () {
  equals(MY_WRONG_STRING_FORMAT_BLOOM, 0);
}).
should('have two blooms', function () {
  equals(JellyfishApp.blooms.length, 2);
}).
should_eventually('install a click handler on an id', function () {
  // click on #header
  //document.getElementById("test_link").click();
  equals(MY_CLICKED_EVENT, 1);
});

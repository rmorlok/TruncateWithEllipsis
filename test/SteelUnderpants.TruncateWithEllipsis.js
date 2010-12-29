/* 
 * JavaScript TruncateWithEllipsis
 * SteelUnderpants.truncateWithEllipsis.js unit tests
 * Copyright 2010, Steel Underpants Software (Ryan Morlok)
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 */
module("Normal Cases");

test("Start Ellipsis", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 5, twe.START, "..."),           "",      "empty string");
  same(twe("1234", 5, twe.START, "..."),       "1234",  "less than max chars");
  same(twe("12345", 5, twe.START, "..."),      "12345", "exactly max chars");
  same(twe("123456", 5, twe.START, "..."),     "...56", "one more than max chars");
  same(twe("1234567890", 5, twe.START, "..."), "...90", "many more than max chars");
});

test("Middle Ellipsis", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 5, twe.MIDDLE, "..."),           "",        "empty string");
  same(twe("1234", 5, twe.MIDDLE, "..."),       "1234",    "less than max chars");
  same(twe("12345", 5, twe.MIDDLE, "..."),      "12345",   "exactly max chars");
  same(twe("123456", 5, twe.MIDDLE, "..."),     "1...6",   "one more than max chars");
  same(twe("1234567890", 5, twe.MIDDLE, "..."), "1...0",   "many more than max chars");
  same(twe("1234567890", 6, twe.MIDDLE, "..."), "12...0",  "many more than max chars");
  same(twe("1234567890", 7, twe.MIDDLE, "..."), "12...90", "many more than max chars");
  same(twe("1234567890", 6, twe.MIDDLE, ".."),  "12..90",  "many more than max chars");
  same(twe("1234567890", 7, twe.MIDDLE, ".."),  "123..90", "many more than max chars");
});

test("End Ellipsis", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 5, twe.END, "..."),           "",      "empty string");
  same(twe("1234", 5, twe.END, "..."),       "1234",  "less than max chars");
  same(twe("12345", 5, twe.END, "..."),      "12345", "exactly max chars");
  same(twe("123456", 5, twe.END, "..."),     "12...", "one more than max chars");
  same(twe("1234567890", 5, twe.END, "..."), "12...", "many more than max chars");
});

test("Explicit Ellipsis Length", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 5, twe.MIDDLE, "<em>...</em>", 3),           "",        "empty string");
  same(twe("1234", 5, twe.MIDDLE, "<em>...</em>", 3),       "1234",    "less than max chars");
  same(twe("12345", 5, twe.MIDDLE, "<em>...</em>", 3),      "12345",   "exactly max chars");
  same(twe("123456", 5, twe.MIDDLE, "<em>...</em>", 3),     "1<em>...</em>6",   "one more than max chars");
  same(twe("1234567890", 5, twe.MIDDLE, "<em>...</em>", 3), "1<em>...</em>0",   "many more than max chars");
  same(twe("1234567890", 6, twe.MIDDLE, "<em>...</em>", 3), "12<em>...</em>0",  "many more than max chars");
  same(twe("1234567890", 7, twe.MIDDLE, "<em>...</em>", 3), "12<em>...</em>90", "many more than max chars");
  same(twe("1234567890", 6, twe.MIDDLE, "<em>..</em>", 2),  "12<em>..</em>90",  "many more than max chars");
  same(twe("1234567890", 7, twe.MIDDLE, "<em>..</em>", 2),  "123<em>..</em>90", "many more than max chars");
});

module("Dumb Cases");

test("Max Length Shorter Than Ellipsis", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 2, twe.START, "..."),           "",   "empty string");
  same(twe("12", 2, twe.START, "..."),         "12", "less than max chars");
  same(twe("123", 2, twe.START, "..."),        "..", "one more than max chars");
  same(twe("123", 2, twe.MIDDLE, "..."),       "..", "one more than max chars");
  same(twe("123", 2, twe.END, "..."),          "..", "one more than max chars");
});

test("Zero-length ellipsis", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 2, twe.START, ""),           "",   "empty string");
  same(twe("12", 2, twe.START, ""),         "12", "less than max chars");
  same(twe("123", 2, twe.START, ""),        "23", "one more than max chars");
  same(twe("123", 2, twe.MIDDLE, ""),       "13", "one more than max chars");
  same(twe("123", 2, twe.END, ""),          "12", "one more than max chars");
});

test("Zero-length max length", function() {
  var twe = SteelUnderpants.truncateWithEllipsis;
  
  same(twe("", 0, twe.START, "..."),           "",   "empty string");
  same(twe("12", 0, twe.START, "..."),         "",   "non-empty string, non-empty ellipsis");
  same(twe("123", 0, twe.START, ""),           "",   "non-empty string, empty ellipsis");
});

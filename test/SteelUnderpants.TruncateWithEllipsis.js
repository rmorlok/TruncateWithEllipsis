/* 
 * JavaScript TruncateWithEllipsis
 * SteelUnderpants.TruncateWithEllipsis.js unit tests
 * Copyright 2010, Steel Underpants Software (Ryan Morlok)
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 */
module("Normal Cases");

test("Start Ellipsis", function() {
  var twe = SteelUnderpants.TruncateWithEllipsis;
  
  same(twe("", 5, twe.START, "..."),           "",      "empty string");
  same(twe("1234", 5, twe.START, "..."),       "1234",  "less than max chars");
  same(twe("12345", 5, twe.START, "..."),      "12345", "exactly max chars");
  same(twe("123456", 5, twe.START, "..."),     "...56", "one more than max chars");
  same(twe("1234567890", 5, twe.START, "..."), "...90", "many more than max chars");
});

test("Middle Ellipsis", function() {
  var twe = SteelUnderpants.TruncateWithEllipsis;
  
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
  var twe = SteelUnderpants.TruncateWithEllipsis;
  
  same(twe("", 5, twe.END, "..."),           "",      "empty string");
  same(twe("1234", 5, twe.END, "..."),       "1234",  "less than max chars");
  same(twe("12345", 5, twe.END, "..."),      "12345", "exactly max chars");
  same(twe("123456", 5, twe.END, "..."),     "12...", "one more than max chars");
  same(twe("1234567890", 5, twe.END, "..."), "12...", "many more than max chars");
});


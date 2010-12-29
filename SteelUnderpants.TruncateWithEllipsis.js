/* 
 * JavaScript Truncate Strings With Ellipsis
 * SteelUnderpants.truncateWithEllipsis.js
 * Copyright 2010, Steel Underpants Software (Ryan Morlok)
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 */
(function(global, SteelUnderpants) {

if( typeof SteelUnderpants === "undefined" ) {
  SteelUnderpants = global.SteelUnderpants = {};
}

/**
 * Ensures that a string is not longer than a certain number of characters,
 * and if it is, truncates the string with a trailing ellipsis. The number of
 * characters in the ellispis is considered as part of the truncated character
 * count.
 *
 * @param theString the string to possibly be truncated
 * 
 * @param maxLength the maximum length the string can be before it is truncated, and if
 *        is truncated, the length of the final truncated string
 *
 * @param howToTruncate where the ellipsis will be placed when a string is truncated. Can be:
 * 
 *        SteelUnderpants.truncateWithEllipsis.START
 *        SteelUnderpants.truncateWithEllipsis.MIDDLE
 *        SteelUnderpants.truncateWithEllipsis.END
 *        
 *        Defaults to Steelunderpants.TruncateWithEllipsisis.END
 * 
 * @param truncateChars the characters to use an ellipsis. defaults to "..."
 *
 * @param truncateCharsLength how many characters truncateChars should be considered to be. Useful
 *        to set if truncateChars has HTML markup that should not be considered in the truncation
 *        calculations. Deafults to truncateChars.length
 *
 * @return the possibly truncated string
 */
SteelUnderpants.truncateWithEllipsis = function SteelUnderpants$TruncateWithEllipsis(
  theString, 
  maxLength, 
  howToTruncate, 
  truncateChars,
  truncateCharsLength) {

  if( typeof theString !== "string" ) {
    throw "String to truncate must be specified.";
  }

  if( typeof maxLength !== "number" ) {
    throw "Max string length must be specified.";
  }

  if( theString.length <= maxLength ) {
    return theString;
  }

  if( howToTruncate !== SteelUnderpants.truncateWithEllipsis.START &&
      howToTruncate !== SteelUnderpants.truncateWithEllipsis.MIDDLE &&
      howToTruncate !== SteelUnderpants.truncateWithEllipsis.END ) {
      howToTruncate = SteelUnderpants.truncateWithEllipsis.END;
  }

  if( typeof truncateChars !== "string") {
    truncateChars = "...";
  }

  if( typeof truncateCharsLength !== "number" ) {
    truncateCharsLength = truncateChars.length;
  }

  if( maxLength <= truncateCharsLength ) {
    return truncateChars.substring(0, maxLength);
  }

  if( howToTruncate === SteelUnderpants.truncateWithEllipsis.START ) {

    return truncateChars + theString.substring(theString.length - (maxLength - truncateCharsLength)); 

  } else if( howToTruncate === SteelUnderpants.truncateWithEllipsis.MIDDLE ) {

    var firstChunkEnd = Math.ceil( (maxLength - truncateCharsLength)/2 );
    return theString.substring(0, firstChunkEnd) +
	   truncateChars +
	   theString.substring(theString.length - (maxLength - truncateCharsLength - firstChunkEnd));

  } else { // howToTruncate === SteelUnderpants.truncateWithEllipsis.END

    return theString.substring(0, maxLength - truncateCharsLength) + truncateChars; 

  }
};

/**
 * Constant to indicate that a string should start with ellipsis when truncated.
 * E.g. "...lazy brown dogs"
 */
SteelUnderpants.truncateWithEllipsis.START = -1;

/**
 * Constant to indicate that a string should have ellipsis in the middle when truncated.
 * E.g. "The quick red fox...lazy brown dogs"
 */
SteelUnderpants.truncateWithEllipsis.MIDDLE = 0;

/**
 * Constant to indicate that a string should end with ellipsis when truncated.
 * E.g. "The quick red fox..."
 */
SteelUnderpants.truncateWithEllipsis.END = 1;

})(window, window.SteelUnderpants);

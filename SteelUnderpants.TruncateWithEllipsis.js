/* 
 * JavaScript EventManager
 * SteelUnderpants.TruncateWithEllipsis.js
 * Copyright 2010, Steel Underpants Software (Ryan Morlok)
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 */
(function(globalScope) {

if( typeof globalScope.SteelUnderpants === "undefined" )
	globalScope.SteelUnderpants = {};

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
 *        SteelUnderpants.TruncateWithEllipsis.START
 *        SteelUnderpants.TruncateWithEllipsis.MIDDLE
 *        SteelUnderpants.TruncateWithEllipsis.END
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
globalScope.SteelUnderpants.TruncateWithEllipsis = function SteelUnderpants$TruncateWithEllipsis(
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

  if( howToTruncate !== globalScope.SteelUnderpants.TruncateWithEllipsis.START &&
      howToTruncate !== globalScope.SteelUnderpants.TruncateWithEllipsis.MIDDLE &&
      howToTruncate !== globalScope.SteelUnderpants.TruncateWithEllipsis.END ) {
      howToTruncate = globalScope.SteelUnderpants.TruncateWithEllipsis.END;
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

  if( howToTruncate === globalScope.SteelUnderpants.TruncateWithEllipsis.START ) {
    return truncateChars + theString.substring(theString.length - (maxLength - truncateCharsLength)); 
  } else if( howToTruncate === globalScope.SteelUnderpants.TruncateWithEllipsis.MIDDLE ) {
    var firstChunkEnd = Math.ceil( (maxLength - truncateCharsLength)/2 );
    return theString.substring(0, firstChunkEnd) +
	   truncateChars +
	   theString.substring(theString.length - (maxLength - truncateCharsLength - firstChunkEnd));
  } else { // howToTruncate === globalScope.SteelUnderpants.TruncateWithEllipsis.END
    return theString.substring(0, maxLength - truncateCharsLength) + truncateChars; 
  }
};

globalScope.SteelUnderpants.TruncateWithEllipsis.START = -1;
globalScope.SteelUnderpants.TruncateWithEllipsis.MIDDLE = 0;
globalScope.SteelUnderpants.TruncateWithEllipsis.END = 1;

})(window);

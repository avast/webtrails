
export const validators = {

	IP: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  EMAIL: /([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})/,
  //PHONE: /(\(?\+?[0-9]{1,2}\)?[-. ]?)?(\(?[0-9]{3}\)?|[0-9]{3})[-. ]?([0-9]{3}[-. ]?[0-9]{4}|\b[A-Z0-9]{7}\b)/,
  //PROPERTY_UNIT_NUMBER: /(apt|bldg|dept|fl|hngr|lot |pier|rm|ste|slip|trlr|unit |#)\s*\.?#?\s*[0-9]+[a-z0-9-]*\b/i,
  PROPERTY_STREET_ADDRESS: /\d+(\s+[nsew]\.?)?(\s+\w+){1,}\s+(?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|ave(?:\.|nue)?|rd|road|lane|boulevard|blvd|loop|way|circle|cir|court|ct|plaza|square|run|parkway|point|pike|square|driveway|trace|park|terrace)(\s|[^a-z]|$)/,
  SSN: /\b\d{3}[ -.]\d{2}[ -.]\d{4}\b/
 }


 const aptRegex = /(apt|bldg|dept|fl|hngr|lot|pier|rm|ste|slip|trlr|unit|#)\.? *[a-z0-9-]+\b/gi;
 const poBoxRegex = /P\.? ?O\.? *Box +\d+/gi;
 const roadRegex = /(street|st|road|rd|avenue|ave|drive|dr|loop|court|ct|circle|cir|lane|ln|boulevard|blvd|way)\.?\b/gi;

 export const creditCardNumber = /\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}|\d{4}[ -]?\d{6}[ -]?\d{4}\d?/g;
 export const streetAddress = new RegExp(
   '(\\d+\\s*(\\w+ ){1,2}' + roadRegex.source + '(\\s+' + aptRegex.source + ')?)|(' + poBoxRegex.source + ')',
   'gi'
 );
 export const zipcode = /\b\d{5}\b(-\d{4})?\b/g;
 export const phoneNumber = /(\(?\+?[0-9]{1,2}\)?[-. ]?)?(\(?[0-9]{3}\)?|[0-9]{3})[-. ]?([0-9]{3}[-. ]?[0-9]{4}|\b[A-Z0-9]{7}\b)/g;
 export const ipAddress = /(\d{1,3}(\.\d{1,3}){3}|[0-9A-F]{4}(:[0-9A-F]{4}){5}(::|(:0000)+))/gi;
 export const usSocialSecurityNumber = /\b\d{3}[ -.]\d{2}[ -.]\d{4}\b/g;
 export const emailAddress = /([a-z0-9_\-.+]+)@\w+(\.\w+)*/gi;
 export const username = /(user( ?name)?|login): \S+/gi;
 export const password = /(pass(word|phrase)?|secret): \S+/gi;
 export const credentials = /(login( cred(ential)?s| info(rmation)?)?|cred(ential)?s) ?:\s*\S+\s+\/?\s*\S+/gi;
 export const digits = /\b\d{4,}\b/g;
 export const url = /([^\s:/?#]+):\/\/([^/?#\s]*)([^?#\s]*)(\?([^#\s]*))?(#([^\s]*))?/g;

/**
 * Configuration Settings
 */
define(function () {

  var environment;
  environment = "dev"; //comment this line out for production

  /*****************************************
   * Public API
   ****************************************/
  return {
    basePath:environment === "dev" ? "/Backbone/" : "/",
    baseAPIURL:environment === "dev" ? "http://api-dev.ipaymentinc.com" : "http://api.ipaymentinc.com",
    proxyURL:environment === "dev" ? "/Backbone/Home/Proxy" : "/Home/Proxy",
    merchantsApiVersion:"1.1",
    emailApiVersion:"1.0",
    logVersion:"",
    logDebugEnabled:true,
    logInfoEnabled:true,
    logTraceEnabled:true,
    logErrorEnabled:true,
    logExceptionEnabled:true,
    logWarnEnabled:true,
    logFatalEnabled:true,
    async:true,
    debug:true,
    emailOverride:"tdoherty@ipaymentinc.com",
    spinOpts:{ color:'#196BAF', bgColor:'gray', opacity:4 }
  };
});
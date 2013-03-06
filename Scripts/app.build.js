({
    appDir: "../",
    baseUrl: "Scripts",
    dir: "../../Build",
    paths: {
        "jquery": "../../../../iPayment.Core/iPayment.Core.Javascript/Scripts/ThirdParty/jquery/1.5.1/jquery.min",
        "ThirdParty": "../../../../iPayment.Core/iPayment.Core.Javascript/Scripts/ThirdParty",
        "core": "../../../../iPayment.Core/iPayment.Core.Javascript/Scripts/Core",
        "text": "../../../../iPayment.Core/iPayment.Core.Javascript/Scripts/ThirdParty/text"
     },
    optimize: "uglify", //"uglify", "closure" (Java Only), "closure.keepLines" (Java Only), "none"
    modules: [
        {
            name: "main",
            exclude: ["config"]
        }
    ]
})
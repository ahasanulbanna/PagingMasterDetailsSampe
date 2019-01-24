(function () {
    "use strict";

    window.baseAPIUrl = 'http://localhost:58443/';//API URL


    var commonServie = angular.module("common.services", []);

    commonServie.constant("appSettings",
        {
            scerpAPI: window.baseAPIUrl,
          
        });


}());

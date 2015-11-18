var DinRoute = (function () {
    function DinRoute() {
    }
    DinRoute.setApp = function (app) {
        DinRoute.app = app;
    };
    DinRoute.getApp = function () {
        return DinRoute.app;
    };
    return DinRoute;
})();
exports.DinRoute = DinRoute;

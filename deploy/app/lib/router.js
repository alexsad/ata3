var DinRoute_1 = require("./DinRoute");
function methodDecoratorFactory(verbName) {
    return function (path) {
        return function (target, handlerName, descriptor) {
            if (!target.$$controllerConfiguration) {
                target.$$controllerConfiguration = {
                    routes: [],
                    root: null
                };
            }
            ;
            if (!path) {
                path = "/";
            }
            ;
            target.$$controllerConfiguration.routes.push({
                "verb": verbName,
                "url": path,
                "handlerName": handlerName
            });
        };
    };
}
function Controller(p_root) {
    return function (target) {
        var tmpConfig = target.prototype;
        tmpConfig.$$controllerConfiguration.routes.forEach(function (route) {
            console.log("add rota " + p_root + route.url + " : " + route.verb);
            DinRoute_1.DinRoute.getApp()[route.verb](p_root + route.url, target.prototype[route.handlerName]);
        });
    };
}
exports.Controller = Controller;
exports.Get = methodDecoratorFactory('get');
exports.Post = methodDecoratorFactory('post');
exports.Put = methodDecoratorFactory('put');
exports.Delete = methodDecoratorFactory('delete');
exports.Patch = methodDecoratorFactory('patch');

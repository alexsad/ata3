var app = require("../../../server");

var tmpElement = null;

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
        tmpElement = new target();
        var tmpConfig = target.prototype;
        if (!p_root) {
            p_root = "/" + target.name.toLowerCase();
        };
        tmpConfig.$$controllerConfiguration.routes.forEach(function (route) {
            console.log(p_root + route.url+" "+route.verb);
            app.server[route.verb](p_root + route.url, target.prototype[route.handlerName].bind(tmpElement));
        });
    };
}
exports.Controller = Controller;
exports.Get = methodDecoratorFactory('get');
exports.Post = methodDecoratorFactory('post');
exports.Put = methodDecoratorFactory('put');
exports.Delete = methodDecoratorFactory('del');
exports.Patch = methodDecoratorFactory('patch');
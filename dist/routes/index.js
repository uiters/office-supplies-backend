"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const employee_route_1 = __importDefault(require("./employee.route"));
const department_route_1 = __importDefault(require("./department.route"));
const education_route_1 = __importDefault(require("./education.route"));
const position_route_1 = __importDefault(require("./position.route"));
const account_route_1 = __importDefault(require("./account.route"));
class Routes {
    init(app) {
        app.use("/api/employee", employee_route_1.default);
        app.use("/api/department", department_route_1.default);
        app.use("/api/education", education_route_1.default);
        app.use("/api/position", position_route_1.default);
        app.use("/api/auth", account_route_1.default);
    }
}
exports.Routes = Routes;

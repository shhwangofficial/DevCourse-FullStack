var Employee = /** @class */ (function () {
    function Employee(name, age, job) {
        this.printInfo = function () { };
        this.name = name;
        this._age = age;
        this._job = job;
    }
    Object.defineProperty(Employee.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (val) {
            this._age = val;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee("상하", 28, "개발자");
console.log(employee1.age); // 28, 정상 작동
employee1.age = 29; // 정상작동

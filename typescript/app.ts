class Employee {
	// 직접 선언 부분은 지워두고,
	constructor(name: string, private _age: number, private _job: string) { 
	// 재정의 하는 부분도 지웠다.
	}
	get age() {
	  return this._age;
	}
	set age(val: number) {
	  this._age = val;
	}
	printInfo: () => void = (): void => {};
  }
  
  let employee1 = new Employee("상하", 28, "개발자");
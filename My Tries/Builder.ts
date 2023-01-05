interface Builder {
    management(): void;
    development(): void;
    testing(): void;
    deploying(): void;
}

class Project {
    private result: string;

    constructor() {
        this.result = `Parts of project:`;
    }

    public showProjectParts(): void {
        console.log(this.result);
    }

    public addPart(part): void {
        this.result += `\n - ${part}`;
    }
}

class Employees implements Builder { // as Builder
    public project: Project;

    constructor() {
        this.startNewProject();
    }

    public startNewProject(): void {
        this.project = new Project();
    }

    deploying(): void {
        this.project.addPart('deploying');
    }

    development(): void {
        this.project.addPart('development');
    }

    management(): void {
        this.project.addPart('management');
    }

    testing(): void {
        this.project.addPart('testing');
    }

    getProject(): Project {
        const project = this.project;
        this.startNewProject();
        return project;
    }
}

class Company { // As Director
    public employees: Employees;

    public employeesInvolvement(employees: Employees): void {
        this.employees = employees;
        employees.startNewProject();
    }

    public full(): void {
        this.employees.management();
        this.employees.development();
        this.employees.testing();
        this.employees.deploying();
    }

    public devAndTest(): void {
        this.employees.development();
        this.employees.testing();
    }
}

const clientFull = (company: Company, employees: Employees): void => {
    company.employeesInvolvement(employees);

    company.full();
    employees.getProject().showProjectParts();
}

const clientDevAndTest = (company: Company, employees: Employees): void => {
    company.employeesInvolvement(employees);

    company.devAndTest();
    employees.getProject().showProjectParts();
}

const clientCustom = (employees: Employees): void => {
    employees.development();
    console.log('Development done (custom)')
    employees.project.showProjectParts();

    console.log('Few month later...');
    console.log('Client want to test code');
    
    employees.testing();
    console.log('Testing done (custom)')
    employees.project.showProjectParts();

    console.log('Few month later...');
    console.log('Client want to deploy code');

    employees.deploying();
    console.log('Deploying done (custom)')
    employees.project.showProjectParts();
}

const year = (company: Company, employees: Employees) => {
    console.log('The year has begun');

    console.log('Client full');
    clientFull(company, employees);

    console.log('Client dev and test');
    clientDevAndTest(company, employees);

    console.log('Client custom');
    clientCustom(employees);

    console.log('The year is over');
}

const company = new Company();
const employees = new Employees();

year(company, employees);


// The year has begun
// Client full
// Parts of project:
//  - management
//  - development
//  - testing
//  - deploying
// Client dev and test
// Parts of project:
//  - development
//  - testing
// Client custom
// Development done (custom)
// Parts of project:
//  - development
// Few month later...
// Client want to test code
// Testing done (custom)
// Parts of project:
//  - development
//  - testing
// Few month later...
// Client want to deploy code
// Deploying done (custom)
// Parts of project:
//  - development
//  - testing
//  - deploying
// The year is over
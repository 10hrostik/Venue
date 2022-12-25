class Person {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }
}

let power = function(mass) {
    for (let i of mass) {
        i *= i;
    }
    return mass;
}
const testObject = {
    power: function(mass) {
        for (let i of mass) {
            i *= i;
        }
        return mass;
    }
}

let copyMass = (callback, mass) => {
    mass = callback(mass);
    let mass1 = JSON.stringify(mass);
    for (let i of mass) {
        console.log(i);
    }
}
let instance1 = new Person(1, "Rostik")
console.log(instance1.name)
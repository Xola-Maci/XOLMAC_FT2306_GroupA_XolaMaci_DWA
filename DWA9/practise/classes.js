//@ts-check
/**
 * @callback Update
 * @param {numbers} [amount]
 */

/**
 * @callback EmptyFn
 */

/**
 * @typedef {object} Icounter
 * @prop {Update} increase
 * @prop {Update} decrease
 * @prop {EmptyFn} display
 */

/**
 * @returns {Icounter}
 */

class counter {
    //static firstName = 'Xola';
    //static surname = 'Maci';

    //static greet (){
        //return 'Yah Sawubona';
    //}

    #value = 1;

    set value(newValue){
        this.#value = newValue;
    }

    get value(){
        return this.#value;
    }

    /**
     * @param {string} label 
     */

    constructor(label){
        this.label = label;
    }

    /**
     * @param {number} amount 
     */
    increase(amount){
        this.#value += amount || 1
    }

    /**
     * @param {number} amount 
     */
    decrease(amount){
        this.#value -= amount || 1
    }

    display(){
        console.log(`${this.#value} ${this.label}`);
    }
}
//console.log(counter.firstName,counter.surname,counter.greet())

const example = new counter('Celsius');

example.increase(10)
example.increase(1)
example.increase(1)
example.decrease(1)
example.display()
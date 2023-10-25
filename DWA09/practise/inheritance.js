// EXTENSION
class animal{
    alive = true;
}

class Mammal extends animal{
    legs = undefined;
}

class Dog extends Mammal{
    legs = 4;
}

class Cat extends Mammal{
    legs = 4;
}

class SpotTheDog extends Dog{
    legs = 3;
}

const instance = new SpotTheDog();
instance.alive

// COMPOSITION

const flyable = {
    isFlying: false,
    liftOff(){
        this.isFlying = true},
    land (){
        this.isFlying = false}
}

const metal = {
    material: 'hard',
    tap: () => console.log('clang clang')
}

const feathers = {
    material: 'soft',
    tap: () => console.log('shhhh shhhh')
}

const airplane ={
    ...flyable,
    ...metal,
}

airplane.liftOff()
airplane.tap()

const duck ={
    ...flyable,
    ...feathers
}

duck.liftOff()
duck.tap()

//PROTOTYPE 

//Prototypal chain

class EventTarget extends Object{}

class Node extends EventTarget{}

class Element extends Node{}

class HTMLElement extends Element{}

class HTMLButtonElement extends HTMLElement{}

//from the above example, if this was a true class based language 

//class duck extends flyable, feathers{}
//class airplane extends flyable, metal{}

/**
 * Directly modifying prototypes
 * Clever but can be very confusing
 * WARNING: Modifying the prototype of any built-in constructor is
   considered a bad practise and risks forward compatibility
 */

class Bird {
    /**@type {string}  */
    color = undefined;
}

class Bird {
    wings = 2;
}

const dove = new Bird();

Bird.prototype.legs = 9; // automatically sets all the legs of the existing birds to 9, very dangerous

class birds extends animal{
    wings = 2;
}

const instanc2 = new birds();
birds.prototype.wings = 9;

console.log(instanc2.wings())

//WEB COMPONENTS

class SingleTask extends HTMLElement {

    inner = this.attachShadow({mode: 'closed'})

    connectedCallback (){
        //const duplicate =template.content.cloneNode();
        this.inner.appendChild(template.content)
    }
}
customElements.define("single-task",SingleTask)
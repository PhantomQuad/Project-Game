class Room {
    constructor(name, description){
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
    }
    get name() {
        return this._name;
    }
    
    get description() {
        return this._description;
    }
    
    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }
    
    describe(){
        return "When you look around the " + this._name + " you see " + this._description;
    }

    linkRoom(direction, roomToLink){
        this._linkedRooms[direction] = roomToLink;
    }

    move(direction){
        if (direction in this._linkedRooms){
            return this._linkedRooms[direction];
        } else {
            document.getElementById("feedbackArea").innerHTML = "You can't go that way";
            return this;
        }
    }
}

class Character {
    constructor(name, description, pronoun, conversation){
        this._name = name;
        this._description = description;
        this._pronoun = pronoun;
        this._conversation = conversation;
        this._linkedCharacters = {};
    }

    get name() {
        return this._name;
    }
    
    get description() {
        return this._description;
    }

    get pronoun() {
        return this._pronoun;
    }

    get conversation() {
        return this._conversation;
    }
    
    describe(){
        return "You see " + this._name + " ahead of you " + this._description;
    }

    talk(){
        return this._name + " says " + this.conversation;
    }

}

class Enemy extends Character {
    constructor(name, description, pronoun, conversation, weakness){
        super(name, description, pronoun, conversation);
        this._weakness = weakness;
    }

    fight(item){
        if (item = this._weakness){
            return true;
        } else {
            return false;
        }
    }
}

class Item {
    constructor(name, description){
        this._name = name;
        this._description = description;
        this._linkedItems = {};
    }

    get name() {
        return this._name;
    }
    
    get description() {
        return this._description;
    }
    
    describe(){
        return "You see " + this._name + " on the floor " + this._description;
    }

}



function displayRoomInfo(room){
    textContent = room.describe();

    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("usertext").focus();
}

function startGame(){
    currentRoom = Kitchen;
    displayRoomInfo(currentRoom);
}

document.addEventListener("keydown", function(event) {
    document.getElementById("feedbackArea").innerHTML = "";
    if (event.key ==="Enter"){
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"];
        if (directions.includes( command.toLowerCase() )) {
            currentRoom = currentRoom.move(command);
            displayRoomInfo(currentRoom);
        } else {
            document.getElementById("usertext").value = "";
            document.getElementById("feedbackArea").innerHTML = "that is not a valid command please try again";
        }
    }
});

const Kitchen = new Room("Kitchen", "the overflowing bin and then the smell hits you!");
const LivingRoom = new Room("Living Room", "a filthy settee with unknown stains on it");

const Maiden = new Character("Maiden of Virtue", "Giant", "Female", "You must repent for your sins!!!");
const Attumen  = new Character("Attumen the Huntsman ", "Undead", "Male", "You're no match for my firey warhorse Midnight!");

Kitchen.linkRoom("west", LivingRoom);
LivingRoom.linkRoom("east", Kitchen);

startGame();
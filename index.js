class Room {
    constructor(name){
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
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

    set description(value) {
        if (value.length < 4) {
            console.log("Description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }
    
    describe(){
        return "Looking around the " + this._name + " you can see " + this._description;
    }

    linkRoom(direction, roomToLink){
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
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
    constructor(name){
        this._name = name;
        this._description = "";
        this._pronoun = "";
        this._conversation = "";
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

    set name(value) {
        if (value.length < 4) {
          console.log("Name is too short.");
          return;
        }
        this._name = value;
      }
    
    set description(value) {
        if (value.length < 4) {
          console.log("Decription is too short.");
          return;
        }
        this._description = value;
    }
    
    set conversation(value) {
        if (value.length < 4) {
          console.log("Conversation is too short.");
          return;
        }
        this._conversation = value;
    }
    
    describe(){
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }

    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

class Enemy extends Character {
    constructor(name) {
      super(name);
      this._weakness = "";
    }
  
    set weakness(value) {
      if (value.length < 4) {
        console.log("Decription is too short.");
        return;
      }
      this._weakness = value;
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
    constructor(name){
        this._name = name;
        this._description = "";
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
    
      set description(value) {
        if (value.length < 4) {
          console.log("Decription is too short.");
          return;
        }
        this._description = value;
      }
    
    describe(){
        return "The " + this._name + " is " + this._description;
    }

}



function displayRoomInfo(room){
    textContent = room.describe();

    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("usertext").focus();
}

const Deadwind = new Room("Deadwind Pass");
Deadwind.description = "a haunted forest and canyon on the edges of the Kingdom of Stormwind in the southern Eastern Kingdoms."
const Karazhan = new Room("Karazhan");
Karazhan.description = "a dungeon located in Deadwind Pass. You'd have to be brave or stupid to enter."
const GuestChambers = new Room("The Guest Chambers");
GuestChambers.description = "a huge church, with a giant sized altar, pulpit and crucifix to match.";
const ServantsQuarters = new Room("Servant's Quarters");
ServantsQuarters.description = "stables with a few horses inside them, zombie horses!";
const Menagerie = new Room("The Menagerie");
Menagerie.description = "large collections of art works spread all over the place";

Deadwind.linkRoom("north", Karazhan);
Karazhan.linkRoom("south", Deadwind);
Karazhan.linkRoom("north", GuestChambers);
GuestChambers.linkRoom("south", Karazhan);
Karazhan.linkRoom("east", ServantsQuarters);
ServantsQuarters.linkRoom("west", Karazhan);
Karazhan.linkRoom("west", Menagerie);
Menagerie.linkRoom("east", Karazhan);

const Maiden = new Character("Maiden of Virtue");
Maiden.description = "Giant";
Maiden.pronoun = "she";
Maiden.conversation = "You must repent for your sins!!!";
Maiden.weakness = "Shadow";

const Attumen  = new Character("Attumen the Huntsman");
Attumen.description = "Undead";
Attumen.pronoun = "he";
Attumen.conversation = "You're no match for my firey warhorse Midnight!";
Attumen.weakness = "Frost";

const Curator  = new Character("The Curator");
Attumen.description = "Mechanical";
Attumen.pronoun = "he";
Attumen.conversation = "You shouldn't have come here!!!";
Attumen.weakness = "Holy";

GuestChambers.character = Maiden;
ServantsQuarters.character = Attumen;
Menagerie.character = Curator;

function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
      occupantMsg = ""
    } else {
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}

function displayRoomInfo(room){
    textContent = room.describe();

    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("usertext").focus();
}

function startGame(){
    currentRoom = Deadwind;
    displayRoomInfo(currentRoom);

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
}

startGame();
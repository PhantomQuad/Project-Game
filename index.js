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

    get character() {
        return this._character;
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
        this._item = "";
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

    get item() {
        return this._item;
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

    set item(value) {
        this._item = value;
      }
    
    describe(){
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }

    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }

    items() {
        return this._name + " has " + this._item.description;
    }
}

class Enemy extends Character {
    constructor(name) {
      super(name);
      this._weakness = "";
    }

    get weakness() {
        return this._weakness;
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
        this._power = "";
    }

    get name() {
        return this._name;
    }
    
    get description() {
        return this._description;
    }

    get power() {
        return this._power;
    }

    set name(value) {
        if (value.length < 3) {
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

    set power(value) {
        if (value.length < 3) {
          console.log("Name of power is too short.");
          return;
        }
        this._name = value;
      }
    
    describe(){
        return "The " + this._name + " is " + this._description + this._power + " power";
    }

}

// create rooms
const Deadwind = new Room("Deadwind Pass");
Deadwind.description = "a dungeon called Karazhan. You'd have to be brave or stupid to enter.";
const Karazhan = new Room("Karazhan Dungeon");
Karazhan.description = "rodents running in all directions, and a blanket of cobwebs covering the walls.";
const GuestChambers = new Room("Guest Chambers");
GuestChambers.description = "a huge church, with a giant sized altar, pulpit and crucifix to match.";
const ServantsQuarters = new Room("Servant's Quarters");
ServantsQuarters.description = "stables filled with strange looking horses inside them, wait a minute there're zombie horses!";
const Menagerie = new Room("Menagerie");
Menagerie.description = "large collections of art works spread all over the place";
const ExitDeadwind = new Room("Deadwind Pass");
ExitDeadwind.description = "the sun is just coming up over the horizen. Well done adventurer you have managed to beat Karazhan";

// create items
const ShadowBlade = new Item("Shadow Blade");
ShadowBlade.description = "a magical blade filled with magical powers.";
ShadowBlade._power = "shadow";

const FrostStaff = new Item("Frost Staff");
FrostStaff.description = "an ancient staff, it looks cold to touch.";
FrostStaff._power = "frost";

const HolyStaff = new Item("Holy Staff");
HolyStaff.description = "a magnificient and godly giant staff.";
HolyStaff._power = "holy";

const DungeonKey = new Item("Dungeon Key");
DungeonKey.description = "a key to allow you to exit the dungeon.";
DungeonKey._power = "key";

// link rooms
Deadwind.linkRoom("north", Karazhan);
Karazhan.linkRoom("south", ExitDeadwind);
Karazhan.linkRoom("north", GuestChambers);
GuestChambers.linkRoom("south", Karazhan);
Karazhan.linkRoom("east", ServantsQuarters);
ServantsQuarters.linkRoom("west", Karazhan);
Karazhan.linkRoom("west", Menagerie);
Menagerie.linkRoom("east", Karazhan);

// create characters

// You
const Player1 = new Character("Player1");

// 1st encounter
const Sylvanas = new Character("Sylvanas Windrunner");
Sylvanas.description = "Undead Elf";
Sylvanas.pronoun = "she";
Sylvanas.conversation = "Greeting adventurer, I have something that will help you on your travels."
Sylvanas.item = ShadowBlade;

// 2nd encounter
const Maiden = new Enemy("Maiden of Virtue");
Maiden.description = "Giant";
Maiden.pronoun = "she";
Maiden.conversation = "You must repent for your sins!!!";
Maiden.weakness = "Shadow";
Maiden.item = HolyStaff;

// 3rd encounter
const Curator = new Enemy("The Curator");
Curator.description = "Mechanical";
Curator.pronoun = "he";
Curator.conversation = "You shouldn't have come here!!!";
Curator.weakness = "Holy";
Curator.item = FrostStaff;

// final encounter
const Attumen = new Enemy("Attumen the Huntsman");
Attumen.description = "Undead";
Attumen.pronoun = "he";
Attumen.conversation = "You're no match for my firey warhorse Midnight!";
Attumen.weakness = "Frost";
Attumen.item = DungeonKey;

// Place the characters
GuestChambers.character = Maiden;
ServantsQuarters.character = Attumen;
Menagerie.character = Curator;
Deadwind.character = Sylvanas;

// Display all info about the room
function displayRoomInfo(room) {
    let occupantMsg = "";
    let listItem = "";
    let doAction = "";
    if (room.character === "") {
      occupantMsg = ""
    } else {
      occupantMsg = room.character.describe() + ". " + room.character.converse()
      
      if (room.character.item !== ""){
          listItem = room.character.items();
          if (room.character.weakness !== undefined){
            // document.getElementById("feedbackArea").innerHTML = "Found an enemy!";
            doAction = "Would you like to fight " + room.character.name + "?";
          } else {
              doAction = "Would you like to take the item from " + room.character.name + "?";

          }
      }
    }
    
  
    textContent = "<p>" + room.describe() + "</p>" +
     "<p>" + occupantMsg + "</p>" +
     "<p>" + listItem + "</p>" +
     "<p>" + doAction + "</p>" +
     "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}

// Start the game
function startGame(){
    currentRoom = Deadwind;
    displayRoomInfo(currentRoom);

    document.addEventListener("keydown", function(event) {
    document.getElementById("feedbackArea").innerHTML = "";
    if (event.key ==="Enter"){
        command = document.getElementById("usertext").value;
        command = command.toLowerCase()
        const directions = ["north", "south", "east", "west"];
        if (directions.includes(command)) {
            currentRoom = currentRoom.move(command);
            if (currentRoom === ExitDeadwind){
                if (Player1.item === DungeonKey) {
                    document.getElementById("feedbackArea").innerHTML = "You have the key!";
                    displayRoomInfo(currentRoom);
                } else {
                    document.getElementById("feedbackArea").innerHTML = "The door is locked, you need to find a key...";
                    currentRoom = Karazhan;
                    displayRoomInfo(currentRoom);
                }
            } else {
                displayRoomInfo(currentRoom);
            }
        } else if (command === "take") {
            if (currentRoom.character === Sylvanas){
                Player1.item = currentRoom.character.item;
                document.getElementById("feedbackArea").innerHTML = "You take " + currentRoom.character.name + "'s " + Player1.item.name;
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("feedbackArea").innerHTML = "HA HA HA nice try!!!";
                displayRoomInfo(currentRoom);
            }
            
        } else if (command === "fight"){
            
                document.getElementById("feedbackArea").innerHTML = "you wanna fight";
                displayRoomInfo(currentRoom);
        } else {
            document.getElementById("usertext").value = "";
            document.getElementById("feedbackArea").innerHTML = "that is not a valid command please try again";
        }
    }
    });
}
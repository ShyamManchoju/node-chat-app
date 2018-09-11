class Rooms{
    constructor(){
        this.rooms = [
            {id:'-1', name:'--select--', selected:'true'},
            {id:'1', name:'Test', selected:'false'},
            {id:'2', name:'MyClass', selected:'false'},
            {id:'3', name:'MyTeam', selected:'false'}
        ];
    }

    getRooms(){
        return this.rooms;
    }

    getSelectedRoom(id){
        return this.rooms.filter((room)=>{room.id === id})[0];
    }

}

module.exports = {Rooms};
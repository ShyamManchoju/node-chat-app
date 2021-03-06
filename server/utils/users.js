
class Users{
    constructor(){
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUserList(room){
        var users = this.users.filter((user)=> user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }

    getUserAvailability(params){
        console.log('USer List :',this.users);
        console.log('params :', params);
        return this.users.filter((user)=> (user.name === params.name && user.room === params.room));
    }
}

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUsersList(room)

module.exports = {Users};
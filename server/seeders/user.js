import {User} from "../models/user.js";
import {faker} from "@faker-js/faker";

const createUser = async (numUsers)=>{
    try {
        const usersPromise=[];
        for(let i=0;i<numUsers;i++){
            const tempUser =User.create({
                name:faker.person.fullName(),
                username:faker.internet.userName(),
                password:"123456789",
                avatar:{
                    public_id:faker.system.commonFileName(),
                    url:faker.image.avatar()
                }
            })
            usersPromise.push(tempUser);

        }
        await Promise.all(usersPromise);
        console.log("Users created");
        process.exit(1);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

export {createUser};
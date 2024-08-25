const userRepository = require('../Repository/userRepository');

const fetchdata = async () =>{
    const users = await userRepository.getUser();
    return users;
}

module.exports = {fetchdata}



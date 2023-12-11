import axios from 'axios';

class UserService {
  AUTH_SERVER_ADDRESS = 'http://localhost:3000';

  constructor() {}

  getOptions(token) {
    const bearerAccess = 'Bearer ' + token;

    const options = {
      headers: {
        Authorization: bearerAccess,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // withCredentials: true
    };

    return options;
  }

  async getUsers(token) {
    const myOptions = this.getOptions(token);
    console.log(myOptions);

    try {
      const response = await axios.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    // Alternatively, you can use the following code if you want to use promises:
    // return axios.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions)
    //   .then(response => {
    //     console.log(response.data);
    //     return response.data;
    //   })
    //   .catch(error => {
    //     console.error('Error fetching users:', error);
    //     throw error;
    //   });
  }
}

export default UserService;

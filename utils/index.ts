import axios from 'axios';

export const BASE_URL = "http://localhost:3000/";

export const createOrGetUser = async (response: any, addUser: any) => {
  
  const { name, picture, sub } = response;
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
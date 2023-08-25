import axios from 'axios';

export const api = axios.create({baseURL:'http://localhost:8080'});

//mudar local https://api-recados-4r1i.onrender.com/
import axios from 'axios';

const getAllData = (url) => axios.get(url);
const getById = (url, id) => axios.get(`${url}/${id}`);

const addItem = (url, obj) => axios.post(url, obj ,);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);
export { getAllData, getById, addItem, updateItem, deleteItem };

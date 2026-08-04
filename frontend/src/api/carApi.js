import axios from "axios";

const apiKey = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const fetchCars = async () =>{
    try{
        const res = await axios.get(`${apiKey}/cars`)
        return res.data.data
    }catch(err){
        console.log("Error creating car:", err);
        throw err; 
    }
}

export const createCar = async (value) =>{
    try{
        await axios.post(`${apiKey}/car`, value)
    }catch(err){
        console.log("Error creating car:", err);
        throw err; 
    }
}


export const updateCar = async (id, value) =>{
    try{
        await axios.put(`${apiKey}/car/${id}`, value)
    }catch(err){
        console.log("Error updating car:", err);
        throw err; 
    }
}

export const deleteCar = async (id) =>{
    try{
        console.log(id)
        await axios.delete(`${apiKey}/car/${id}`)
    }catch(err){
        console.error("Error deleting car:", err);
        throw err; 
    }
}
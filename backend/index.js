import express from "express";
//require('dotenv').config();
import dotenv from "dotenv";

// call the config function
dotenv.config({path:'/Users/dongjinli/Documents/ReceipeBox/.env'});
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Receipe } from './models/receipeModel.js';
import receipeRoute from './routes/receipeRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
//app.use(express.json());

//middleware for handling CORS policy
//option 1 : allow all origins with default of cors
app.use(cors());
//option 2L allow custom origins
//app.use(
  //  cors({
    //    origin: 'http://localhost: 3000',
      //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //allowedHeaders: ['Content-Type'],
    //})
//)
//console.log(process.env.MONGO_URI);

//const test = dotenv.config({path:'ReceipeBox/.env'});
//console.log(test)

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('hello');
});

//Route for save a new receipe
app.post('/receipe', async (request, response) => {
    try {
        if(
            !request.body.name ||
            !request.body.ingredients ||
            !request.body.process
        ){
            return response.status(400).send({
                message: 'Send all required fields: name, ingredients, process',
            });
        };
        const newReceipe ={
            name: request.body.name,
            ingredients: request.body.ingredients,
            process: request.body.process,
        };

        const receipe = await Receipe.create(newReceipe);

        return response.status(201).send(receipe);

    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Get all receipes from database
app.get('/receipe',async (request,response) => {
    try {
        const receipe = await Receipe.find({});
        return response.status(200).json({
            count: receipe.length,
            data: receipe
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get one receipes from database by id
app.get('/receipe/:id',async (request,response) => {
    try {

        const { id } = request.params;

        const receipe = await Receipe.findById(id);
        return response.status(200).json(receipe);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update a receipe
app.put('/receipe/:id',async (request,response) => {
    try {
        if(
            !request.body.name ||
            !request.body.ingredients ||
            !request.body.process
        ){
            return response.status(400).send({
                message: 'Send all required fields: name, ingredients, process',
            });
        }

        const { id } = request.params;
        const result = await Receipe.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Receipe not found'});
        }
        return response.status(200).send({message: 'Receipe updated successfully'});
    }

    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

//Route for delete a receipe

app.delete('/receipe/:id', async(request,response) => {
    try {
        const { id } = request.params;

        const result = await Receipe.findByIdAndDelete(id);

        if(!result){
            return response,status(404).json({message: 'Receipe not found'});

        }
        return response.status(200).send({message: 'Receipe deleted successfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//middleware
app.use('/receipe', receipeRoute);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT,() => {
            console.log(`APP is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);

    });

import express from 'express';
import { Receipe } from '../models/receipeModel.js';

const router = express.Router();

router.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('hello');
});

//Route for save a new receipe
router.post('/', async (request, response) => {
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
router.get('/',async (request,response) => {
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
router.get('/:id',async (request,response) => {
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
router.put('/:id',async (request,response) => {
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

router.delete('/:id', async(request,response) => {
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

export default router;
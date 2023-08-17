import React, { useState } from 'react'
import './createTodo.css'
import { useForm } from 'react-hook-form';


const CreateTodo = (props) => {
    
    const { refresh, setRefresh } = props;
    const [newTodo, setNewTodo] = useState()
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = async (e) => {
        const body = {
            text: e.text,
            fecha: e.fecha,
            done: false,
        };

        let payload;
        try{
            const response = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
            })
            if (response.ok) {
                payload = await response.json()
            }else {
                throw new Error;
            }
            setNewTodo(payload)
            setRefresh(!refresh)   
            reset()         
        } catch (fetchError) {
            console.log(fetchError)
        }
    };     
    
    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <input placeholder='Insert your new task' {...register('text')} className='formBox'></input>
                <input type='date' {...register('fecha')} className='formBox'></input>
                <input type='submit' value='Create' className='createTask'></input>
            </form>
        </div>
    );
};

export default CreateTodo;

        // <div className='createTodo'>
        //     <form onSubmit={handleSubmit(onSubmit)} className='form'>
        //         <input {...register('text')} className='formBox'></input>
        //         <input type='date' {...register('fecha')} className='formBox'></input>
        //         <label htmlFor='' className='labelDone'>Done:</label>
        //         <select {...register('done')} className='formBoxDone'>
        //             <option value=''>Select</option>
        //             <option value='True'>True</option>
        //             <option value='False'>False</option>
        //         </select>
        //         <input type='submit' value='Create' className='createTask'></input>
        //     </form>
        // </div>
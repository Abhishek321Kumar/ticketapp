import React,{useState} from "react";
import axios from 'axios';
import './TicketForm.css';

function CreateForm() {
 const [form,setForm] = useState({
title:'',
description:'',
priority:'Low',
createdBy:''
 })


const handleChange=(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value })
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        await axios.post('/api/tickets', form);
        alert('Ticket created');
        setForm ({title:'',
        description:'',
        priority:'Low',
        createdBy:''
        });
    } catch(error){
        alert("Error Creating ticket ");
        console.log(error);
    }
}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" value={form.title} onChange={handleChange}/> <br/><br/>

        <label htmlFor="description" >Description: </label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange}></textarea> <br/><br/>

        <label htmlFor="priority">Priority: </label>
        <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <br/><br/>

        <label htmlFor="createdBy">Created by: </label>
        <input type="text" id="createdBy"  name="createdBy" value={form.createdBy} onChange={handleChange}/>
        <br/> <br/>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateForm;

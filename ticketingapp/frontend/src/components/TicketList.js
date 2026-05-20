import React, {useState,useEffect} from "react";
import axios from 'axios';
import './TicketList.css'


function TicketList(){
    const[tickets,setTickets] = useState([]);

    const fetchTickets = async() =>{
        try{
            const res = await axios.get('http://localhost:5000/api/tickets');
            setTickets(res.data);

        }catch(error){
            alert("Error fetching the Ticket");
            console.log(error);
        }
    };

    const deleteTicket = async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tickets/${id}`);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket._id !== id));
        }catch(error){
            alert("Error in deleting Ticket");
            console.log(error);
        }
    };


    const updateTicket = async(id, newStatus)=>{
        try{
            await axios.put(`http://localhost:5000/api/tickets/${id}`, { status: newStatus });
            setTickets(prevTickets =>
                prevTickets.map(ticket =>
                    ticket._id === id ? {...ticket, status: newStatus} : ticket
                )
            );
        }catch(error){
            alert("Error in updating Ticket");
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchTickets();
        // window.dispatchEvent(new Event("ticketCreated"))
    },[]);

    return(
        <div className= "ticket-list">
            <h2>Tickets</h2>
            {tickets.length === 0 && <p>No Tickets found</p>}
            {tickets.map((ticket)=>(
            <div key ={ticket._id} className="ticket-card">
             <h3>{ticket.title}</h3>
             <p><strong>Description: </strong> {ticket.description}</p>
             <p><strong>Priority: </strong> {ticket.priority}</p>
             <p>
                <strong> Status: </strong>{' '}
                <span className={`status-badge ${
                    ticket.status==='Open'?'status-open':
                    ticket.status ==='In Progress'?'status-in-progress':'status-resolved'
                }`}>
                    {ticket.status}
                    </span>
             </p>
             <p>Created by: {ticket.createdBy}</p>
             <p>Created at:{new Date(ticket.createdAt).toLocaleString()}</p>
             <div className="ticket-button">
             <button onClick = {()=> updateTicket(ticket._id,'In Progress')}>In progress</button>
             <button onClick = {()=> updateTicket(ticket._id,'Resolved')}>Resolved</button>
             <button onClick = {()=> deleteTicket(ticket._id)}>Delete</button>
             </div>   
             </div>
            ))}
        </div>
    )

}

export default TicketList;

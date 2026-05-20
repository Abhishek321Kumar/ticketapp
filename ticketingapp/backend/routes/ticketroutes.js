const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Get all tickets


router.post('/', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ err: 'Ticket not found' });
        }

        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

        if (!deletedTicket) {
            return res.status(404).json({ err: 'Ticket not found' });
        }

        res.json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

module.exports = router;

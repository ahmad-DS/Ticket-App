const { Router } = require("express");
// const authorization  = require("../Middlewares/authorization");
const authenticate = require("../Middlewares/authentication")
const TicketModel = require("../Models/ticket.model");

const tickets = Router();

tickets.get("/", authenticate, async (req, res) => {
	const { userId } = req.body;
	try {
		let allTickets = await TicketModel.find({ userId });
		res.json({ data: allTickets })
	}
	catch (err) { res.status(404).send({ msg: "please login" }) }


})

const validate = (req, res, next) => {
	const { title, status } = req.body;
	if (title && status) {
		next()
	} else res.json({ msg: "data insufficient" })
}
tickets.post("/create", authenticate, async (req, res) => {
	const new_note = new TicketModel(req.body);
	console.log(req.body)
	console.log(new_note)
	await new_note.save()

	res.send({msg:"new todo added successfully"})
})

tickets.patch("/:ticketId", authenticate, async (req, res) => {
	// console.log('params: ', req.params, ' query: ', req.query, ' body: ', req.body);
	const ticketId = req.params.todoId;
	const { userId,bookmark } = req.body;

	// let allNotes=await NoteModel.find();
	await TicketModel.updateOne({ _id: ticketId, userId }, { $set: {...req.body,bookmark:!bookmark} })
	res.send({ msg: `todo with id ${todoId} has been updated` })
})

tickets.get("/bookmarks", authenticate, async (req, res) => {
	// console.log('params: ', req.params, ' query: ', req.query, ' body: ', req.body);
	const { userId } = req.body;
	try {
		let allbookmarked = await TicketModel.find({ userId,bookmark:true });
		res.json({ data: allbookmarked })
	}
	catch (err) { res.status(404).send({ msg: "please login" }) }
})



module.exports = tickets
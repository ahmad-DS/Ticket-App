const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({

	category: { type: String, required: true },
	title: { type: String, required: true,default:false },
	bookmark:{ type: Boolean, required: true,default:false },
	message: { type: String, required: true },
	userId:{type:String,required:true}
},
	{
		versionKey: false,
		timestamps:true
	})

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = TicketModel
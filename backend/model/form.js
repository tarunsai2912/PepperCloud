const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    inputs: [{
        type: { type: String, required: true },
        label: { type: String, required: true },
        placeholder: { type: String }
    }]
})

module.exports = mongoose.model("Form", formSchema)

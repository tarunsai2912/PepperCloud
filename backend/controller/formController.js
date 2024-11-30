const Form  = require('../model/form')

const getAllForms = async(req, res, next) => {
    try{
        const forms = await Form.find()
        return res.status(200).json({msg: 'All Forms Fetched!', forms}) 
    }
    catch(err){
        return next(err)
    }
}

const createForm = async(req, res, next) => {
    try{
        const { title, inputs } = req.body
        const form = new Form({ 
            title, 
            inputs 
        })
        await form.save()
        return res.status(200).json({ msg: "Form created successfully!", form })
    }
    catch(err){
        return next(err)
    }
}

const getFormById = async(req, res, next) => {
    try{
        const {id} = req.params
        const form = await Form.findById(id)
        if(!form){
            return res.status(400).json({msg: 'Form Not Found!'})
        }
        return res.status(200).json(form)
    }
    catch(err){
        return next(err)
    }
}

const updateForm = async (req, res, next) => {
    try{
        const { title, inputs } = req.body
        const {id} = req.params
        const form = await Form.findByIdAndUpdate(id, { title, inputs }, { new: true })
        return res.status(200).json({ msg: "Form updated successfully!", form })
    }
    catch(err){
        return next(err)
    }
}

const deleteForm = async (req, res, next) => {
    try{
        const {id} = req.params
        await Form.findByIdAndDelete(id)
        const forms = await Form.find()
        return res.status(200).json({ msg: "Form deleted successfully!", forms })
    }
    catch(err){
        return next(err)
    }
}

module.exports = { getAllForms, getFormById, createForm, updateForm, deleteForm }
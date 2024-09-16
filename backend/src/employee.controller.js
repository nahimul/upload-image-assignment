import {Employee} from './employee.model.js';
import { uploadCloudinary } from './cloudinary.js';
//Add employee
const addEmployee = async (req, res) => {
    const { name, email, phone, dob } = req.body;
    if ([name, email, phone, dob].some(field => field?.trim() === '')) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isExist = await Employee.findOne({ $or:[{email},{phone}] });
    if(isExist) {
        console.log("User with email or phone already exist! Try new one..");
        return res.status(409).json({ message: 'User with email or phone already exist! Try new one..' });
}
    const imagePath = req.files?.avatar[0]?.path;
    if (!imagePath) return res.status(400).json({ message: 'Avatar is required and path!' });

    const avatar = await uploadCloudinary(imagePath);
    if (!avatar) return res.status(400).json({ message: 'Avatar is required!' });

    const employee = await Employee.create({
        name,
        email,
        phone,
        dob,
        avatar: avatar?.url || '',
    });

};

//Update employee
const editEmployee= async (req,res,next)=>{
    const{email,phone,dob,name} =req.body;
    const employee = await Employee.findOne({   $or:[{email}] });    
    if (!employee) return res.status(404).json({ message: 'Employee not found!' });
    else{
        console.log("Employee found!", employee);
    }
    
    let updateData = {
        email:req.body.email,
    };
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = dob;
    if(req.files){

        const imagePath = req.files?.avatar?.path;
        if (imagePath) {
    
            const avatar = await uploadCloudinary(imagePath);
            updateData.avatar = avatar?.url || '';
        }
    }
    
    Employee.findByIdAndUpdate(employee._id,{$set:updateData})
    .then((employee)=>{
        res.status(200).json(employee);
    })
    .catch((error)=>{
        res.status(50).json({
            message:error
        })
    })
};
//Show employees
const show=(req,res,next)=>{
    const email = req.body.email;
    Employee.findOne({ $or:[{email}]} )
    .then((employee)=>{
        res.status(200).json(employee);
    })
    .catch((error)=>{
        res.status(500).json({
            message:error
        })
    })
};

//Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//Delete employee
const  deleteEmployee = async (req, res) => {
    let mail =req.body.email;
    Employee.findOneAndDelete(mail)
    .then((employee)=>{
        res.status(200).json(employee);
    })
    .catch((error)=>{
        res.status(500).json({
            message: error
        })
    })
};

export default { addEmployee, getEmployees, editEmployee, deleteEmployee,show };

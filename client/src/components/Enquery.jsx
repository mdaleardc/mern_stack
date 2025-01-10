import {useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const Enquery = () => {
  const [enqueryList, setEnqueryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  }
  
  // get all enquery list
    const getEnqueries = async () => {
    try {
      const response = await axios("http://localhost:3000/api/website/enquery/view");
      setEnqueryList(response.data);
    } catch (err) {
      console.error("Something went wrong to view enquery data");
    }}
    
  useEffect(()=>{
    getEnqueries();
  },[formData]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // update 
    if(formData._id) {
      try {
        const response = await axios.put(`http://localhost:3000/api/website/enquery/update/${formData._id}`, formData);
        toast.success("Enquery updated successfully!");
    setFormData({name: '', email: '', phone: '', message: ''});
      } catch (err) {
        toast.error(err.message);
      }
    } else {
    try { // submit form data
    const response = await axios.post("http://localhost:3000/api/website/enquery/insert", formData);
    toast.success("Form submitted successfully.");
    } catch (err) {
      toast.error("An error occured while form submitting!");
      console.error(err.message);
    }
    }
    setFormData({name: '', email: '', phone: '', message: ''});
  }
  
  // row delete
  const deleteRow = async (delId) => {
    const isConfirm = window.confirm("Are you sure to delete this query?\n It can't be undone later!");
    try {
    if(isConfirm) {
      const response = await axios.delete(`http://localhost:3000/api/website/enquery/delete/${delId}`);
      toast.success("Enquery deleted successfully");
    getEnqueries();
      }
    }
      catch (err) {
      toast.error("Something went wrong to delete!");
    }
  }
  
  //get single row
  const editRow = async (editId) => {
    try {
      const response = await axios(`http://localhost:3000/api/website/enquery/single-row/${editId}`);
      setFormData(response.data.singleEnquery);
    } catch (err) {
      toast.error(err.message);
    }
  }
  
  
  return (
  <>
    <h1 className='mx-auto py-6 text-center text-3xl font-bold text-zinc-900'>User Enquery</h1>
  <div className="mx-auto px-2 pb-6 grid md:grid-cols-[30%_auto] gap-5 text-zinc-600">
  <div className='rounded-md bg-gray-300 py-3 px-1 h-fit'>
  <h2 className='mx-auto py-2 text-center text-xl font-semibold text-zinc-900'>Enquery Form</h2>
  <ToastContainer />
  <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
    <input type="text" name="name" value={formData.name} placeholder="Full name" className='w-full h-8 px-2 outline-none rounded focus:ring-[0.05rem] ring-green-400' onChange={handleChange}/>
    <input type="text" name="email" value={formData.email} placeholder="Email address" className='w-full h-8 px-2 outline-none rounded focus:ring-[0.05rem] ring-green-400' onChange={handleChange}/>
    <input type="tel" name="phone" value={formData.phone} placeholder="Phone number" className='w-full h-8 px-2 outline-none rounded focus:ring-[0.05rem] ring-green-400' onChange={handleChange}/>
    <textarea name="message" value={formData.message} rows="3" placeholder="Write your message" className='bg-[#ffff] w-full px-2 outline-none rounded focus:ring-[0.05rem] ring-green-400' onChange={handleChange}></textarea>
    <input type="submit" value={formData._id ? "Update" : "Submit"} className='w-full h-8 px-2 text-white font-semibold outline-none rounded bg-green-900'/>
  </form>
  </div>
  
  <div className='rounded-md bg-gray-300 py-3 px-1 h-fit'>
  <h1 className='mx-auto py-2 text-center text-xl font-semibold text-zinc-900'>Enquery List</h1>
  <table className='w-full bg-white rounded table-auto text-left'>
    <thead>
      <tr className='h-9'>
        <th>SR#</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>PHONE</th>
        <th>MESSAGE</th>
        <th>EDIT</th>
        <th>DELETE</th>
      </tr>
    </thead>
    <tbody>
      {
      enqueryList.length > 0 ? (enqueryList.map((list, index) => (
      <tr className='odd:bg-gray-100' key={list._id}>
        <td>{index + 1}</td>
        <td>{list.name}</td>
        <td>{list.email}</td>
        <td>{list.phone}</td>
        <td>{list.message}</td>
        <td className='text-blue-500 px-2' onClick={()=>editRow(list._id)}><FaRegPenToSquare size='18'/></td>
        <td className='text-red-500 pl-3' onClick={()=>deleteRow(list._id)}><MdDeleteForever size='20'/></td>
      </tr>
      ))) : <tr className='text-center'><td colSpan="8">No queries found!</td></tr>
      }
      </tbody>
  </table>
  </div>
  </div>
  </>
    );
};

export default Enquery;
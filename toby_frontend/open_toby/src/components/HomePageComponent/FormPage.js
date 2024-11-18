import axios from 'axios';
import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UsersContext';
const FormPage = () =>{
    const {usersData,setUsersData} = useContext(UserContext);
    const [formData,setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value }= e.target;
        setFormData((prevData) => ({...prevData,[name]: value,}));
      };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
             const response= await axios.post("http://localhost:3001/api/v1/users",{
                user: formData
             })
           console.log("This is the response from the backend")  
           console.log(response.data)
           setUsersData(response.data.user.id);
           localStorage.setItem('user_id',response.data.user.id);
           console.log("This is the usersData id from the context",usersData);
           navigate('/user_profile',{state: {userData: response.data}})
        }
        catch(error){ 
            if(error.response){
              console.log(error.response.data);
              alert(error.response.data.details);
            } 
            else{
              console.log(error.message);
            }
    
        }
      };

    return (
        <>
        <form onSubmit={handleSubmit} className='formforhome'>
          <div className='flex_for_names'>

           <div className='first_name'> 
            <p className='fn_class'>First Name</p>
            <input type="text" id="first_name_input" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
           </div>

           <div className='last_name'> 
            <p className='ln_class'>Last Name</p>
            <input type="text" id="last_name_input" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
           </div>

           </div>

           <div className='email'> 
            <p className='e_class'>Email</p>
            <input type="text" id="email_input" placeholder="email" name="email" value={formData.email} onChange={handleChange} required />
           </div>

           <div className='password'>
            <p className='p_class'>Password</p> 
            <input type="password" id="password_input" placeholder="password" name="password" value={formData.password} onChange={handleChange} required />
           </div>
           <div className="get_started">
                <button type="submit" className="get_started_button">GET STARTED</button>
            </div>
        </form>
        </>
    )
}
export default FormPage;
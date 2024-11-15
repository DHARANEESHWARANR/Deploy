import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const UserLoginForm = () =>{
    const [formData,setFormData] = useState({
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
        try {
          const response = await axios.post("http://localhost:3001/api/v1/login", {
            email: formData.email,
            password: formData.password
          });
          console.log(response);
          navigate('/user_profile', { state: { userData: response.data } });
        } catch(error) {
          if(error.response) {
            console.log(error.response.data);
            alert(error.response.data.error);
          } else {
            console.log(error.message);
          }
        }
      };

    return (
        <>
        <form onSubmit={handleSubmit} className='formforhome'>

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
export default UserLoginForm;
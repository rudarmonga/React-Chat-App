import { userAppStore } from '@/store/index.js'
import React, { useRef, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5';
import {Avatar ,AvatarImage} from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { ADD_IMAGE_PROFILE_ROUTE, HOST, REMOVE_IMAGE_PROFILE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = userAppStore();
  const [firstName, setFirstName] = useState(userInfo.firstName || '');
  const [lastName, setLastName] = useState(userInfo.lastName || '');
  const [image, setImage] = useState(`${HOST}/${userInfo.image}` || null);
  const [hover, setHover] = useState(false);
  const [selectedColor, setSelectedColor] = useState(userInfo.color || 0);
  const fileInputRef = useRef(null);


  const validation = () => {
    if(!firstName) {
      toast.error("First Name is Required!");
      return false;
    }
    if(!lastName) {
      toast.error("Last Name is Required!");
      return false;
    }
    return true;
  }
  const saveChanges = async () => {
    if(validation()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          {firstName, lastName, color: selectedColor},
          { withCredentials: true},
        )

        if(response.status === 200 && response.data) {
          setUserInfo({ ...response.data});
          toast.success("Profile updated Successfully.");
          navigate("/chat");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleNavigate = () => {
    if(userInfo) {
      navigate('/chat');
    } else {
      toast.error("First Complete Profile!");
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_IMAGE_PROFILE_ROUTE, formData, {withCredentials: true});
    
      if(response.status === 200 && response.data.image) {
        setUserInfo({...userInfo, image: response.data.image});
        toast.success("Image updated Successfully!");
      }
    }
  }

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_IMAGE_PROFILE_ROUTE, {withCredentials: true});

      if(response.status === 200) {
        setUserInfo({...userInfo, image: null});
        toast.success("Image removed Successfully.");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div onClick={handleNavigate}>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer'/>
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
            <Avatar className='h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden'>
              {image ? (
                <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black"/>
              ):(
                <div className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {
                    firstName ? 
                      firstName.split("").shift()
                      : userInfo.email.split("").shift() 
                  }
                </div>
              )}
              </Avatar>
              {
                hover && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'
                  onClick={image ? handleDeleteImage : handleFileInputClick}>
                    {
                      image ? <FaTrash className='text-white text-3xl cursor-pointer'/> : <FaPlus className='text-white text-3xl cursor-pointer' />
                    }
                  </div>
                )
              }
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className='hidden' name='profile-image' accept='.png, .jpg, .jpeg, .svg, .webp'/>
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <input 
                placeholder='Email' 
                type="email" 
                disabled 
                value={userInfo.email} 
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' 
              />
            </div>
            <div className='w-full'>
              <input 
                placeholder='First Name' 
                type="text" 
                onChange={(e) => setFirstName(e.target.value)} 
                value={firstName} 
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' 
              />
            </div>
            <div className='w-full'>
              <input 
                placeholder='Last Name' 
                type="text" 
                onChange={(e) => setLastName(e.target.value)} 
                value={lastName}
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' 
              />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((color, index) => <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline-white/50 outline-2" : ""}`} key={index} onClick={() => setSelectedColor(index)}></div>)
              }
            </div>
          </div>
        </div>
        <div>
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
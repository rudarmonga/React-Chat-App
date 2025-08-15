import { userAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Chat() {
  const { userInfo } = userAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup) {
      toast("Please First Complete Profile to continue.");
      navigate('/profile');
    }
  },[userInfo, navigate]);
  return (
    <>
      <p>Chat page</p>
    </>
  )
}

export default Chat
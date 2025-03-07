import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {

  const {userInfo}= useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("please setup ypur profile to continue ");
      navigate("/profile");
    }
  })
  
  return (
    <div>
      lol

    </div>
  )
}

export default Chat

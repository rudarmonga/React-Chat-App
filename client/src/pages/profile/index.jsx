import { userAppStore } from '@/store/index.js'
import React from 'react'

function Profile() {
  const { userInfo } = userAppStore();
  return (
    <>
      <h1>Profile page</h1>
      <div>Email: {userInfo._id}</div>
      <div>Email: {userInfo.email}</div>
    </>
  )
}

export default Profile
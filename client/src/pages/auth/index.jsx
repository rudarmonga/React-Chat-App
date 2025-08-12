import React, { useState } from 'react'
import Background from '@/assets/login2.png'
import Victory from '@/assets/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleLogin = () => {
    // Handle login logic here
  }

  const handleSignUp = () => {
    // Handle sign-up logic here
  }
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="min-h-[80vh] bg-white shadow-2xl w-full max-w-[1200px] rounded-3xl grid xl:grid-cols-2 overflow-hidden">
        <div className="flex flex-col gap-8 items-center justify-center p-6 sm:p-10">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-[60px] sm:h-[80px] md:h-[100px]" />
            </div>
            <p className="font-medium text-gray-600 max-w-sm">
              Fill in the details to get started with the best chat app!
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-full max-w-[350px]">
              
              <TabsList className="flex border-b border-gray-300">
                <TabsTrigger 
                  value="login" 
                  className="flex-1 py-3 text-center text-sm sm:text-base 
                             data-[state=active]:text-purple-600 data-[state=active]:border-b-2 
                             data-[state=active]:border-purple-500 font-medium transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="flex-1 py-3 text-center text-sm sm:text-base 
                             data-[state=active]:text-purple-600 data-[state=active]:border-b-2 
                             data-[state=active]:border-purple-500 font-medium transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="flex flex-col gap-4 mt-6">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input  
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
              </TabsContent>

              <TabsContent value="signup" className="flex flex-col gap-4 mt-6">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input  
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Input  
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className='rounded-full p-6' onClick={handleSignUp}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
            <img src={Background} alt='Background img' className='h-[700px]'/>
        </div>
      </div>
    </div>
  )
}

export default Auth

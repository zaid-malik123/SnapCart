"use client"
import RegisterForm from '@/components/RegisterForm'
import Welcome from '@/components/Welcome'
import React, { useState } from 'react'

const Signup = () => {
  const [step, setStep] = useState(2)
  return (
    <div>
      {step == 1 ? <Welcome nextStep={setStep} /> : 
        <RegisterForm nextStep={setStep} />
      }
      
    </div>
  )
}

export default Signup
import React from 'react'
import Advertisment from '../../common/Ad/Advertisment'
import CreateEvent from '../../components/CreateEvent/CreateEvent'
import Footer from '../Footer'

const CreateEventPage = () => {
  return (
    <div  className="min-h-screen w-full"
    style={{
      background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <CreateEvent />
      <Advertisment />
      <Footer />
    </div>
  )
}

export default CreateEventPage

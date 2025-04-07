import React from 'react'
import Advertisment from '../../common/Ad/Advertisment'
import CreateEvent from '../../components/CreateEvent/CreateEvent'
import Footer from '../Footer'

const CreateEventPage = () => {
  return (
    <div style={{
      backgroundImage: 'url(/create-event/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <CreateEvent />
      <Advertisment />
      <Footer />
    </div>
  )
}

export default CreateEventPage

import React from 'react'

// components
import AddressBar from './Navbar/AddressBar'
import NavButtons from './Navbar/NavButtons'
import TabsBar from './Navbar/TabsBar'

export default function Navbar(): React.ReactElement {
  // TODO: Show navbar only when user hover the top of the screen (y = 0)
  return (
    <div>
      <TabsBar />

      <div
        style={{
          display: 'flex',
        }}>
        <NavButtons />
        <AddressBar />
      </div>
    </div>
  )
}

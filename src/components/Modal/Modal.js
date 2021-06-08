import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ModalComponent({title, children, show}) {
  
  const [open, setOpen] = React.useState(show)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>{title}</Modal.Header>
    
    </Modal>
  )
}

export default ModalComponent
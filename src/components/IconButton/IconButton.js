import React from 'react'
import { Icon, Button} from 'semantic-ui-react'
const IconButton = ({ color, name, style, onClick }) => {

  return (

    <Button 
     onClick={()=>onClick()}
    style={{
      borderRadius: '50%',
      width: 70,
      height: 70,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      ...style
    }}>
      <Icon color={color} name={name} size="big" style={{margin:'0 auto'}} />
    </Button>
  )
}


export default IconButton
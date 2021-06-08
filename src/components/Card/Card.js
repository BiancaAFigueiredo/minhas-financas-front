import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'



const CardComponent = ({ children, src, title, description, onClick }) => {

  return (<>

    <Card onClick={()=>onClick()}>
      {children}
      <Card.Content>
        <Card.Header style={{textAlign:'center'}}>{title}</Card.Header>
      </Card.Content>
    </Card>

  </>)


}


export default CardComponent
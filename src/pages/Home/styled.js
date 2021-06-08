import styled from 'styled-components'


export const Wrapper = styled.div`

width: 100%;
height: 100vh;
background-image: url(${(props) => props.bg}) ;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`

export const ScrollListContainer = styled.div`

width: fit-content;
height: 900px;
padding: 4px;
border-radius: 10px;
overflow-y: auto;
display: flex;
flex-direction: column;
width:945px;


&::-webkit-scrollbar {
     width: 15px;
     height: 15px;
     border:none;
     border-radius: 14px;
     background-color: none;
}
&::-webkit-scrollbar-thumb {
     width: 15px;
     height: 15px;
     border:1px solid none;
     background-color: black;
     border-radius: 14px;

}

`
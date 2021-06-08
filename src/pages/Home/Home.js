import React, { useEffect, useState } from 'react'
import background from './../../assets/piggy-bank-2889046_1920.jpg'
import { Wrapper } from './styled'
import { ScrollListContainer } from './styled'
import Card from './../../components/Card'
import imageSrc from './../../assets/grocery-store.jpg'
import creditCardImage from './../../assets/Credit Card_Flatline.png'
import { Image, Button, Card as SemanticCard, Modal, Header, Input, Divider, Segment, Item } from 'semantic-ui-react'
import coinsUrl from './../../assets/Coins_Flatline.png'
import IconButton from './../../components/IconButton'
import api from './../../services/api'

import Swal from 'sweetalert2'

const Home = () => {

  const [categories, setCategories] = useState([])
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showCategoryItemsModal, setShowCategoryItemsModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({ _id: '', name: '' })
  const [newItemName, setNewItemName] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [newItemValue, setNewItemValue] = useState(0)
  const [items, setItems] = useState([])
  useEffect(() => {
    console.time('inicio')

    console.timeEnd('inicio')

    loadCategories()

  }, [])

  useEffect(() => {
    loadCategories()
  }, [showCategoryModal])

  const loadCategories = async () => {

    const response = await api.get('/categories')

    console.log('response ', response.data)

    setCategories(response.data)
  }

  const handleCreateCategoryModal = async () => {

    try {
      await api.post('/categories/create', { name: newCategoryName })
      Swal.fire('Categoria Salva Com Sucesso', '', 'success').then(() => {
        setShowCategoryModal(false)
        setNewCategoryName('')
      })

    } catch (e) {
      Swal.fire('Erro ao criar categoria', e.message, 'error').then(() => setShowCategoryModal(false))
      setNewCategoryName('')
      console.error(e)
    }
  }

  const handleDeleteCategory = async () => {

    const { _id } = selectedCategory
    try {

      Swal.fire({
        title: `Você realmente quer deletar a categoria "${selectedCategory.name}" ?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Deletar`,
        denyButtonText: `Não Deletar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Categoria deletada com sucesso Sucesso', '', 'success').then(async () => {
            await api.delete(`/categories/delete/${_id}`)
            await loadCategories()
            setShowCategoryItemsModal(false)
          })
        } else {
          setShowCategoryItemsModal(false)

        }
      })
    } catch (e) {
      Swal.fire('Erro ao criar categoria', e.message, 'error').then(() => setShowCategoryModal(false))
      setNewCategoryName('')
      console.error(e)
    }
  }
  const handleUpdateCategory = async () => {

    const { _id } = selectedCategory
    try {

      Swal.fire({
        title: `Você realmente quer atualizar a categoria "${selectedCategory.name}" ?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Atualizar`,
        denyButtonText: `Não Atualizar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Categoria Atualizada com sucesso Sucesso', '', 'success').then(async () => {
            await api.put(`/categories/update/${_id}`, { name: selectedCategory.name })
            await loadCategories()
            setShowCategoryItemsModal(false)
          })
        } else {
          setShowCategoryItemsModal(false)

        }
      })

    } catch (e) {
      Swal.fire('Erro ao atualizar categoria', e.message, 'error').then(() => setShowCategoryModal(false))
      setNewCategoryName('')
      console.error(e)
    }

  }

  const handleItemCreation = async () => {



    try {
      const response = await api.post(`itens/create`, { name: newItemName, description: newItemDescription, expend: newItemValue, categoryId: selectedCategory._id })
      Swal.fire('Item Salvo com sucesso Sucesso', '', 'success').then(() => {
        setNewItemDescription('')
        setNewItemValue('')
      })
      await loadCategories(selectedCategory)
      await loadCategoryData(selectedCategory)

    } catch (e) {
      Swal.fire('Erro ao  salvar item', e.message, 'error').then(() => setShowCategoryModal(false))
      setNewItemDescription('')
      setNewItemValue('')
      console.error(e)
    }
  }



  const loadCategoryData = async (category) => {
    setShowCategoryItemsModal(true)

    setSelectedCategory(category)

    const response = await api.get(`itens/${category._id}`)

    setItems(response.data)
  }
  const handleItemDeletion = (item) =>{

    try {

      Swal.fire({
        title: `Você realmente quer deletar o item ${item.description} ?`,
        showDenyButton: true,
        confirmButtonText: `Deletar`,
        denyButtonText: `Não Deletar`,
      }).then( async(result) => {
        if (result.isConfirmed) {
          await api.delete(`/itens/delete/${item._id}`)
          await loadCategoryData(selectedCategory)
        await  Swal.fire('Item deletado com sucesso Sucesso', '', 'success')
        } else {
          setShowCategoryItemsModal(false)

        }
      })
    } catch (e) {
      Swal.fire('Erro ao deletar item', e.message, 'error').then(() => setShowCategoryModal(false))
      setNewCategoryName('')
      console.error(e)
    }

  }



  return (
    <>

      <Wrapper bg={background}>

        <Modal
          onClose={() => setShowCategoryModal(false)}
          open={showCategoryModal}
          style={{ height: 'fit-content' }}
          size="small"

        >
          <Modal.Header>Crie Uma Categoria</Modal.Header>
          <Modal.Content image>

            <Input label='Nome da Categoria' focus placeholder='Digite o nome da categoria' value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setShowCategoryModal(false)}>
              Fechar
        </Button>
            <Button
              content="Criar categoria"
              labelPosition='right'
              icon='checkmark'
              onClick={() => handleCreateCategoryModal()}
              positive
            />

          </Modal.Actions>
        </Modal>
        <Modal
          onClose={() => setShowCategoryItemsModal(false)}
          open={showCategoryItemsModal}
          centered
        >
          <Modal.Header>Atualize a Categoria</Modal.Header>
          <Modal.Content style={{ overflow: 'auto' }}>



            <Input label='Nome da Categoria' focus placeholder='Digite o nome da categoria' value={selectedCategory.name}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
            />
            <Segment>
              <Header>Adicionar item</Header>
              <Input label='Descrição' focus placeholder='Descricao do novo Item' value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
              <Input label='Valor' focus placeholder='Valor do novo item' value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
              /><br></br>
              <br></br>
              <Button icon='plus' color='green' label="Adicionar" onClick={() => handleItemCreation()} />
            </Segment>
            <Segment>
              <Header>Itens</Header>

              <ScrollListContainer style={{ height: "170px", width: '99%' }}>
                <Item.Group>
                  {items.map((item) => <Item>
                    <Item.Image size='tiny' src={creditCardImage} />
                    <Item.Content header={item.description} meta={`Valor: R$ ${item.expend}`} key={item._id} />
                    <Item.Extra>
                      <Button floated='right' color="red" onClick={()=>handleItemDeletion(item)}>Deletar</Button>
                    </Item.Extra>
                  </Item>)}


                </Item.Group>

              </ScrollListContainer>

            </Segment>

          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setShowCategoryItemsModal(false)}>
              Fechar
        </Button>

            <Button
              content="Deletar Categoria"
              labelPosition='right'
              icon='delete'
              onClick={() => handleDeleteCategory()}
              negative
            />
            <Button
              content="Atualizar Categoria"
              labelPosition='right'
              icon='checkmark'
              onClick={() => handleUpdateCategory()}
              positive
            />
          </Modal.Actions>
        </Modal>
        {categories.length ?
          <ScrollListContainer>
            <SemanticCard.Group style={{ margin: '0 auto' }}>
              {categories.map((category) =>

              (<Card key={category._id}
                title={category.name} onClick={() => loadCategoryData(category)}>
                <Image key={category._id}
                  src={coinsUrl}
                  wrapped ui={false}
                  size="tiny" />
              </Card>))}

            </SemanticCard.Group>
          </ScrollListContainer> : ''
        }
        <IconButton name="plus" color="green"
          style={{ position: 'absolute', backgroundColor: 'white', right: 0 }}
          onClick={() => setShowCategoryModal(true)}
        />
      </Wrapper>
    </>)

}


export default Home
import './App.css';
import React, { useState } from 'react'
import {
  Button,
  Form,
  Jumbotron,
  Image,
  Modal,
  Spinner
} from 'react-bootstrap'
import axios from 'axios'

function App() {

  const API_URL = 'http://localhost:3001/upload'
  const [openModal, setOpenModal] = useState(false)
  const [imagem, setImagem] = useState(null)
  const [urlImage, setUrlImage] = useState('')
  const [desabilitarBotao, setDesabilitarBotao] = useState(true)
  const [exibirImagem, setExibirImagem] = useState(false)
  const [exibirProcessamento, setExibirProcessando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    try{
      setExibirProcessando(true)
      setDesabilitarBotao(true)
      const formData = new FormData()
      formData.append('imagem', imagem)
      console.log(formData)
      const { data } = await axios.post(API_URL, formData)
      console.log(data)
      setUrlImage(data.path)
      setExibirImagem(true)
    } catch( err ) {
      setExibirProcessando(false)
      setOpenModal(true)
    }
    setExibirProcessando(false)
    setDesabilitarBotao(false)  
  }

  function handleImage(event) {
    setImagem(event.target.files[0])
    setDesabilitarBotao(false)
  }
  function handleFecharModal() {
    setOpenModal(false)
  }

  return (
    <div data-testid='upload' className="App">
      <h3 className="text-center">Upload de imagens</h3>
      <Jumbotron>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Selecione a imagem (PNG ou JPEG).</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImage}
              accept="image/png, image/jpeg" />
          </Form.Group>
          <Form.Group className='text-center'>
            <Button disabled={desabilitarBotao} variant="success" type='submit'>Fazer Upload</Button>
          </Form.Group>
         <Form.Group className={exibirProcessamento ? 'text-center': 'hidden'}>
           <Spinner animation={'border'} role='spinner' ></Spinner>
         </Form.Group>
        
        </Form>
        <div className={exibirImagem ? 'text-center': 'hidden'}>
          <hr/>
          <a href={urlImage} rel="noopener noreferrer" target="_blank" >
            <Image src={urlImage} thumbnail/>
          </a>
          <br/>
        </div>

      </Jumbotron>
      <Modal show={openModal}>
        <Modal.Header closeButton>
          <Modal.Title>Erro ao fazer upload da imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Não foi possível fazer upload da imagem, tente novamente em instantes.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFecharModal} variant="warning">Fechar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

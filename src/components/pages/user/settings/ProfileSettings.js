import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileSettings = ({ ...props }) => {

  const { formData } = props;

  const editarPerfil = async (e) => {
    e.preventDefault();

    let id = formData.id;
    let token = localStorage.getItem('tokenUser');

    let article = '';
    if(e.target.email.value == formData.email){
      article = {nome: e.target.nome.value}
    }else{
      article = {nome: e.target.nome.value, email: e.target.email.value};
    }
    const header = {
      headers: {
      'Authorization': `Bearer ${token}`
    }
  }
    axios.put(`${process.env.REACT_APP_API_URL}editar-pessoa/${id}`,  
              article,
              header
            )
            .then((response) => {
                toast.success('Perfil Atualizado com sucesso', {
                    theme: 'colored',
                    position: "top-right"
                  });
                  
            }).catch((error) => {
                toast.error('Erro ao editar os dados', {
                    theme: 'colored',
                    position: "top-right"
                  });
            });
  }
 
  return (
    <Card>
      <FalconCardHeader title="Meu perfil " />
      <Card.Body className="bg-light">
        <Form onSubmit={(e) => editarPerfil(e)}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                id="nome"
                placeholder="Digita o seu nome completo"
                defaultValue={formData.nome}
                name="nome"
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digita o email"
                defaultValue={formData.email}
                name="email"
              />
            </Form.Group>
          </Row>
          
          <Row>
            <Col className="text-start">
            <Button variant="success" type="submit">
              Editar Senha
            </Button>
            </Col>
          <Col className="text-end">
            <Button variant="primary" type="submit">
              Editar
            </Button>
          </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;

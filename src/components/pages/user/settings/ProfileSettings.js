import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { IMaskInput } from "react-imask";

const ProfileSettings = ({ ...props }) => {

  const { formData } = props;

  const handleSubmit = (e) => {

  }

  const handleChange = (e) => {

  }
  return (
    <Card>
      <FalconCardHeader title="Meu perfil " />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
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
                name="alias"
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

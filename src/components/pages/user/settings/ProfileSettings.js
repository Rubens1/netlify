import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { IMaskInput } from "react-imask";

const ProfileSettings = ({ ...props }) => {

  const { formData } = props;

  console.log(formData);
  
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
                placeholder="Nome completo"
                defaultValue={formData.nome}
                name="nome"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} >
              <Form.Label>Apelido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apelido"
                defaultValue={formData.alias}
                name="alias"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={formData.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} >
              <Form.Label>Celular</Form.Label>
              <Form.Control
                as={IMaskInput}
                mask="(00) 0 0000-000"
                type="tel"
                placeholder="telfone"
                value={formData.celular}
                name="celular"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6}>
              <Form.Label>Telefone fixo</Form.Label>
              <Form.Control
                as={IMaskInput}
                mask="(00) 0000-0000"
                type="tel"
                placeholder="Telefone fixo"
                defaultValue={formData.telefone}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6}>
              <Form.Label>Celular</Form.Label>
              <Form.Control
                as={IMaskInput}
                mask="(00) 0 0000-000"
                type="tel"
                placeholder="Phone"
                value={formData.celular}
                name="celular"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <div className="text-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;

import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { IMaskInput } from "react-imask";
import { api } from 'api/api';
import { ProfileContext } from '../profile/Profile';
import { FormContext } from 'context/Context';
import { toast } from 'react-toastify';

const ProfileSettings = ({ ...props }) => {

  const { formData, setformData } = useContext(ProfileContext)
  const [newData, setNewData] = useState();

  console.log(newData)
  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`editar-pessoa/${formData.id}`, newData)
      .then((response) => {
        toast.success(`${response.data.message}`, {
          theme: 'colored',
          position: "top-right"
        });
      })
      .catch((error) => {
        console.log(error)
      const status = error.response.status;
      const e = error.response.data.errors;

      if (status == 429) {
        toast.error("Muitas tentativas em um curto espaço de tempo tente daqui alguns minutos.", {
          theme: 'colored',
          position: "top-right"
        });
      }

      Object.keys(e).map(i => {
        toast.error(e[`${i}`][0], {
          theme: 'colored',
          position: "top-right"
        });
      })
      })

  }

  const handleChange = (e) => {
    e.preventDefault();

    const key = e.target.id;
    const value = e.target.value;

    setNewData(newData => ({
      ...newData,
      [key]: value
    }));

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
                id="alias"
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
                id="email"
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
                id="celular"
                placeholder="telfone"
                defaultValue={formData.celular}
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
                id="telefone"
                mask="(00) 0000-0000"
                type="tel"
                placeholder="Telefone fixo"
                defaultValue={formData.telefone}
                name="tel_fixo"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6}>
              <Form.Label>Celular</Form.Label>
              <Form.Control
                as={IMaskInput}
                id="rg"
                mask="00.000.000-00"
                type="text"
                placeholder="RG"
                defaultValue={formData.rg}
                name="rg"
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

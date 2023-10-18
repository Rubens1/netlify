import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import TinymceEditor from 'components/common/TinymceEditor';

const CadastrarPedido = () => {
  return (
    <>
      <PageHeader title="Criar Pedido" className="mb-3"> </PageHeader>
      <Card className='p-3'>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome do produto</Form.Label>
          <Form.Control type="text" placeholder="Digita o nome do produto" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Video</Form.Label>
          <Form.Control type="text" placeholder="Link do video" />
        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.Select1">
          <Row>
              <Col xs={6}>
                  <Form.Select aria-label="Define a categoria">
                    <option>Categoria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
              </Col>
              <Col xs={6}>
                <Form.Select aria-label="Define a subcategoria">
                  <option>Subcategoria</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descrição do produto</Form.Label>
          <TinymceEditor height="13.438rem" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.Buttom1">
          <Button variant="primary" type="submit" className="px-4 mx-0">Cadastra</Button>
        </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default CadastrarPedido;

import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import axios from "axios";
import { useState } from 'react';
import { toast } from 'react-toastify';

const CategoriaCadastro = () => {

  const [categoria, setCategoria] = useState('');
  const [newCategory, setNewCategory] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}categorias`)
      .then((response) => {
        setCategoria(response.data.data);
        setNewCategory(false);
      })

  }, [newCategory])

  const cadastra = async (e) => {
    e.preventDefault();
    let categoria = e.target.categoria.value;
    let categoria_pai = e.target.categoria_pai.value;
    let keywords = e.target.keywords.value;
    let descricao = e.target.descricao.value;
    axios.post(`${process.env.REACT_APP_API_URL}cadastrar-categoria`, {
      'categoria': categoria,
      'id_categoria': categoria_pai,
      'keywords': keywords,
      'descricao': descricao
    }).then((response) => {
      setNewCategory(true)
      toast.success('Categoria cadastrada com sucesso', {
        theme: 'colored',
        position: "top-right"
      });

    }).catch((error) => {
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
    });

  }
  return (
    <>
      <PageHeader title="Cadastro Categoria" className="mb-3"> </PageHeader>
      <Card className='p-3'>
        <Form onSubmit={cadastra}>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Categoria</Form.Label>
            <Form.Control type="text" placeholder="Digita o nome da categoria" name="categoria" />
          </Form.Group>
          <Form.Group className="mb-3"> </Form.Group>
          <Form.Label>Categoria Pai</Form.Label>
          <Form.Group className="mb-3">
            <Form.Select aria-label="Define a categoria" name="categoria_pai">
              <option value="0">Categoria Pai</option>
              {categoria ? categoria.map((item, key) => {
                if (item.id_categoria == 0) {
                  return (<option key={key} value={item.id}>{item.categoria}</option>)
                }
              }) : (<></>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capa da categoria</Form.Label>
            <Form.Control type="file" name="capa"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Palavra chave do SEO</Form.Label>
            <Form.Control type="text" placeholder="Digita as palavras chaves" name="keywords" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição do SEO</Form.Label>
            <Form.Control name="descricao" as="textarea" placeholder="Digita a descrição do SEO" rows="5" type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Buttom1">
            <Button variant="primary" type="submit" className="px-4 mx-0" >Cadastra</Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  )
}

export default CategoriaCadastro;
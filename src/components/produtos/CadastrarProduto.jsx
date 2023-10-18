import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Form, Dropdown, Mo } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import TinymceEditor from 'components/common/TinymceEditor';
import axios from "axios";
import { useState } from 'react';
import { toast } from 'react-toastify';

import { getSize } from 'helpers/utils';
import { useDropzone } from 'react-dropzone';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md'
import { IMaskInput } from 'react-imask';


const CadastrarProduto = () => {
  const [categoria, setCategoria] = useState();
  const [subcategoria, setSubCategoria] = useState();
  const [dadosProduto, setdadosProduto] = useState();

  const [capaSelecionada, setCapaSelecionada] = useState(null)
  const capa = (e) => {
    setCapaSelecionada(e)
  }

  const handleChange = (e) => {
    e.preventDefault();

    const key = e.target.id;
    const value = e.target.value;

    setdadosProduto(dadosProduto => ({
      ...dadosProduto,
      [key]: value
    }))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}categorias`)
      .then((response) => {
        setCategoria(response.data.data)
      })

  }, [])

  const cadastra = async (e) => {
    e.preventDefault()
    const nome = e.target.nome.value;
    const codigo = e.target.codigo.value;
    const status = e.target.status.value;
    const categoria = e.target.categoria.value;
    const subcategoria = e.target.subcategoria.value;
    const altura = e.target.altura.value;
    const largura = e.target.largura.value;
    const comprimento = e.target.comprimento.value;
    const peso = e.target.peso.value;
    const descricao = tinymce.activeEditor.getContent();
    const keywords = e.target.keywords.value;
    const descricao_seo = e.target.descricao_seo.value;

    axios.post(`${process.env.REACT_APP_API_URL}cadastrar-produto`, {
      'nome': nome,
      'codigo': codigo,
      'ativo': status,
      'altura': altura,
      'largura': largura,
      'comprimento': comprimento,
      'peso': peso,
      'long_description': descricao,
      'descricao': descricao_seo,
      'keywords': keywords,
      'src': capaSelecionada,
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('tokenUser')}`
      }
    }).then((response) => {
      console.log(response.data);
      toast.success('Produto cadastrado com sucesso', {
        theme: 'colored',
        position: "top-right"
      });
    }).catch((error) => {
      console.log(error.response.data);

      const e = error.response.data.errors;

      Object.keys(e).map(i => {
        toast.error(e[`${i}`][0], {
          theme: 'colored',
          position: "top-right"
        });
      })
    });

  }

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    onDrop: acceptedFiles => {

      setFiles([
        ...files,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  const handleRemove = path => {
    setFiles(files.filter(file => file.path !== path));
  };

  
  return (
    <>
      <PageHeader title="Cadastra produto" className="mb-3"> </PageHeader>
      <Card className='p-3'>
        <Form onSubmit={cadastra}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do produto</Form.Label>
            <Form.Control id="nome" onChange={handleChange} type="text" placeholder="Digita o nome do produto" name="nome" />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Código</Form.Label>
                  <Form.Control onChange={handleChange} id="codigo" type="text" placeholder="Digita o código do produto" name="codigo" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Label >Status do Produto</Form.Label>
                <Form.Select onChange={handleChange} aria-label="Define o Status" name="status">
                  <option value="0">Ativo</option>
                  <option value="1">Desativado</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Row>
              <Col sm={6}>
                <Form.Select aria-label="Define a categoria" name="categoria" className="mb-3" onClick={(e) => setSubCategoria(e.target.value)}>
                  <option value="0">Categoria</option>
                  {categoria ? categoria.map((item, key) => {
                    if (item.id_categoria == 0) {
                      return (
                        <option key={key} value={item.id}>
                          {item.categoria}
                        </option>)
                    }
                  }) : (<></>)}
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Form.Select className="mb-3" aria-label="Define a subcategoria" name="subcategoria" >
                  <option value="0">Subcategoria</option>
                  {categoria ? categoria.map((item, key) => {
                    if (item.id_categoria != 0 && subcategoria == item.id_categoria) {
                      return (<option key={key} value={item.id}>{item.categoria}</option>)
                    }
                  }) : (<></>)}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Row>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Altura (cm)</Form.Label>
                  <Form.Control type="tel" as={IMaskInput} mask="00.00" placeholder="Digita o altura do produto" name="altura" />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Largura (cm)</Form.Label>
                  <Form.Control type="tel" placeholder="Digita o largura do produto" as={IMaskInput} mask="00.00" name="largura" />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Comprimento (cm)</Form.Label>
                  <Form.Control type="tel" placeholder="Digita o comprimento do produto" as={IMaskInput} mask="00.00" name="comprimento" />
                </Form.Group>
              </Col>
              <Col sm={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control type="tel" placeholder="Digita o peso do produto" as={IMaskInput} mask="00.000" name="peso" />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Card className="mb-3">
              <Card.Header as="h5">Adicionar Imagens</Card.Header>
              <Card.Body className="bg-light">
                <div {...getRootProps({ className: 'dropzone-area py-6' })}>
                  <input name="produto_imagem" {...getInputProps()} />
                  <Flex justifyContent="center">
                    <img src={cloudUpload} alt="" width={25} className="me-2" />
                    <p className="fs-0 mb-0 text-700">Escolha as imagens</p>
                  </Flex>
                </div>
                <div>
                  {files.map(file => (
                    <Flex
                      alignItems="center"
                      className="py-3 border-bottom btn-reveal-trigger"
                      key={file.path}
                    >
                      <img
                        className="rounded"
                        width={40}
                        height={40}
                        src={file.preview}
                        alt={file.path}
                      />

                      <Flex
                        justifyContent="between"
                        alignItems="center"
                        className="ms-3 flex-1"
                      >
                        <div>
                          <h6>{file.path}</h6>
                          <Flex className="position-relative" alignItems="center">
                            <p className="mb-0 fs--1 text-400 line-height-1">
                              <strong>{getSize(file.size)}</strong>
                            </p>
                          </Flex>
                        </div>
                      </Flex>
                      <div className="m-2 py-2 cursor-pointer" onClick={(e) => capa(file.path)}>
                        {capaSelecionada == file.path ? (<AiTwotoneStar />) : (<AiOutlineStar />)}
                      </div>
                      <div className="m-2 py-2 cursor-pointer text-danger" onClick={() => handleRemove(file.path)}>
                        <MdDeleteOutline />
                      </div>

                    </Flex>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição do produto</Form.Label>
            <TinymceEditor height="13.438rem" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Palavras chaves do SEO</Form.Label>
            <Form.Control type="text" placeholder="Digita as pallavras chaves" name="keywords" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição do SEO</Form.Label>
            <Form.Control name="descricao_seo" as="textarea" placeholder="Digita a descrição do SEO" rows="5" type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" className="px-4 mx-0">Cadastra</Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default CadastrarProduto;
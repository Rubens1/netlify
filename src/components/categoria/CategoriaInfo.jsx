import React from "react";
import { useEffect, useState } from 'react';
import FalconComponentCard from 'components/common/FalconComponentCard';
import axios from "axios";
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import { toast } from 'react-toastify';

const CategoriaInfo = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [links, setLinks] = useState();
    const [link, setLink] = useState(process.env.REACT_APP_API_URL + "categorias?page=1");
    const [categoria, setCategoria] = useState();
    const [show, setShow] = useState(false);
    const [deletaCategoria, setDeletaCategoria] = useState(false);
    const [editCategoria, setEditCategoria] = useState()
    const [deleteShow, setDeleteShow] = useState();
    const [preDeleteData, setPreDeleteData] = useState();

    useEffect(() => {
        axios.get(link ?? process.env.REACT_APP_API_URL + "categorias?page=1", {
        })
            .then(response => {
                setCategoria(response.data.data);
                setCurrentPage(response.data.current_page);
                setLinks(response.data.links);
                setDeletaCategoria(false)
            });

        const search = document.getElementById("nome");

    }, [link])

    const handleClose = () => {
        setShow(false)
        setDeleteShow(false)
    };

    const handleShow = (e) => {
        setShow(true)
        setEditCategoria("")
        axios.get(`${process.env.REACT_APP_API_URL}categorias/${e}`, {
            'id': e
        })
            .then((response) => {
                setEditCategoria(response.data)
            })
    };

    const editar = async (e) => {
        e.preventDefault();
        setShow(false);

        let id = e.target.id.value;
        const article = { categoria: e.target.categoria.value, id_categoria: e.target.categoria_pai.value, keywords: e.target.keywords.value, descricao: e.target.descricao.value, status: e.target.status.value};

        axios.put(`${process.env.REACT_APP_API_URL}editar-categoria/${id}`, article)
            .then((response) => {
                toast.success('Categoria Atualizado com sucesso', {
                    theme: 'colored',
                    position: "top-right"
                  });
                  axios.get(`${process.env.REACT_APP_API_URL}categorias`)
                  .then((response) => {
                      setCategoria(response.data.data)
                      setDeletaCategoria(false)
                  })
            }).catch((error) => {
                toast.success('Erro ao editar os dados', {
                    theme: 'colored',
                    position: "top-right"
                  });
            });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}categorias`)
            .then((response) => {
                setCategoria(response.data.data)
                setDeletaCategoria(false)
            })

    }, [deletaCategoria])

    const handleItemDelete = (item) => {
        setPreDeleteData(item)
        setDeleteShow(true);
        setShow(false)
    }

    const excluirCategoria = async (e) => {
        axios.delete(`${process.env.REACT_APP_API_URL}excluir-categoria/${preDeleteData.id}`, {
            'id': e
        })
            .then((response) => {
                setShow(false)
                setDeleteShow(false)
                setDeletaCategoria(true)
            })
    }

    return (
        <>
            <PageHeader title="Lista de Categoria" className="mb-3" ></PageHeader>
            <FalconComponentCard className="mb-0">
                <div className='m-3'>
                    <Table responsive striped hover>

                        <thead>
                            <tr>
                                <th scope="col">Categoria</th>
                                <th scope="col">Categoria Pai</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoria && categoria.map((item, key) => (
                                <tr key={`tr-${item.id}`} className="align-middle">
                                    <td className="text-nowrap">{item.categoria}</td>
                                    <td className="text-nowrap">{item.nome}</td>
                                    <td className="text-nowrap">{item.ativo ? 'Ativo' : 'Desativado'}</td>
                                    <td className="text-nowrap">
                                        <Button onClick={() => handleShow(item.id)} className='btn btn-success'><BiEdit /></Button>
                                        <Button onClick={() => handleItemDelete(item)} className='btn btn-danger ms-3'><AiOutlineDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="flex">
                        <nav aria-label="Produtos">
                            <ul className="pagination">
                                {links && links.map((item, key) =>
                                    <li value={item.label} key={`li-${item.label}`} onClick={() => setLink(item.url)} className="page-item">
                                        <Link
                                            id="el"
                                            alt="anterior"
                                            className="page-link"
                                            href="#">{item.label.replace(/&laquo;/g, '').replace(/&raquo;/g, '')}
                                        </Link>
                                    </li>

                                )
                                }

                            </ul>
                        </nav>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={editar}>
                            {editCategoria ? editCategoria.map((item, key) => {
                                if (item.ativo == true) {
                                    item.ativo = 1
                                } else {
                                    item.ativo = 0
                                }
                                return (
                                    <div key={`modal-${item.id}`}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome da Categoria</Form.Label>
                                            <Form.Control type="text" placeholder="Digita o nome da categoria" name="categoria" defaultValue={item.categoria} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                        </Form.Group>
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Categoria Pai</Form.Label>
                                            <Form.Select name="categoria_pai" defaultValue={item.idPai}>
                                                <option value="0" >Selecione a Categoria Pai</option>
                                                {item.idPai  && item.idPai != item.id ? (<option value={item.idPai}>{item.nome}</option>) : ''}
                                                {categoria && categoria.map((item1) => {
                                                    if (item.idPai != item1.id && item1.id != item.id) {
                                                        return (<option key={`pai-${item1.id}`} value={item1.id} >{item1.categoria}</option>
                                                        )
                                                    }
                                                })}

                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Status da categoria</Form.Label>

                                            <Form.Select aria-label="Define a categoria" name="status" defaultValue={item.ativo}>
                                                {item.ativo == 1 ? (
                                                    <>
                                                        <option key={`ativo1-${item.id}`} value="1">Ativo</option>
                                                        <option key={`ativo2-${item.id}`} value="0">Desativado</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option key={`ativo3-${item.id}`} value="0">Desativado</option>
                                                        <option key={`ativo4-${item.id}`} value="1">Ativo</option>
                                                    </>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Palavra chave do SEO</Form.Label>
                                            <Form.Control type="text" placeholder="Digita as palavras chaves" name="keywords" defaultValue={item.keywords} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Descrição do SEO</Form.Label>
                                            <Form.Control name="descricao" as="textarea" placeholder="Digita a descrição do SEO" defaultValue={item.descricao} rows="5" type="text" />
                                        </Form.Group>
                                        <Form.Control type="hidden" name="id" defaultValue={item.id} />
                                        <Form.Group className="mb-3">
                                            <Button variant="primary" type="submit" className="px-4 mx-0" >Editar</Button>
                                        </Form.Group>
                                    </div>
                                )
                            }) : (<></>)}

                        </Form>
                    </Modal.Body>

                </Modal>
                {/**Exlcuir */}
                <Modal show={deleteShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body><h5>Tem certeza que você quer excluir a categoria {preDeleteData ? preDeleteData.categoria : ""}</h5></Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                        <Button className="btn-success" variant="primary" onClick={e => excluirCategoria(preDeleteData ? preDeleteData.id : "")}>
                            CONFIRMAR
                        </Button>
                        <Button className="btn-danger" onClick={handleClose}>
                            CANCELAR
                        </Button>
                    </Modal.Footer>
                </Modal>
            </FalconComponentCard >

        </>
    )
}

export default CategoriaInfo;
import React, { useEffect, useState, useContext } from "react";
import team3 from 'assets/img/team/3.jpg';
import PageHeader from 'components/common/PageHeader';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import FalconComponentCard from 'components/common/FalconComponentCard';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Form, ButtonGroup, Button, Table, Modal } from 'react-bootstrap';

const ClientesInfo = () => {
    const [clientes, setClientes] = useState();
    const [filteredClient, setFilteredCliente] = useState([]);
    const [search, setSearch] = useState();
    const [show, setShow] = useState(false);
    const [links, setLinks] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [link, setLink] = useState(process.env.REACT_APP_API_URL + "pessoas-lista-paginada?page=1")
    const [showEditClienteModal, setShowEditClienteModal] = useState(false);
    const [identifica, setIdentifica] = useState([])
    const [tipoEdite, seTipoEdite] = useState('pessoal');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${link ?? process.env.REACT_APP_API_URL + "pessoas-lista-paginada?page=1"}`, {
        })
            .then(response => {
                console.log(response.data)
                setCurrentPage(response.data.current_page)
                setClientes(response.data.data);
                setLinks(response.data.links);
            });


        const search = document.getElementById("nome");

    }, [link])


    const handleClose = () => {
        setShow(false)
        setShowEditClienteModal(false)
    };

    const handleEditClieteModal = async (e) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}pessoa/${e}`)
        const data = await res.json()
        setIdentifica(data)
        setShowEditClienteModal(true)
    }

    const handleShow = (e) => {
        setShow(true)
        //setIdentifica(e)
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const value = e.target.value;

        setFilteredCliente(clientes.filter((cliente) => cliente.nome.toLowerCase().includes(value.toLowerCase())));

        if (value.length == 0 || filteredClient == []) {
            setFilteredCliente([]);
        }
    }

    return (
        <>
            <>
                <PageHeader title="Lista de clientes" className="mb-3" ></PageHeader>
                <Row className="d-flex justify-content-between">
                    <Col xs={6} className="d-flex justify-content-start">
                        <Button className="mb-4" onClick={() => { navigate("/cadastrar-cliente") }}>
                            Cadastrar clientes
                        </Button>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end ">
                        <Button onClick={e => handleShow()} className="mb-4">
                            Pesquisar cliente
                        </Button>
                    </Col>
                </Row>
                <FalconComponentCard className="mb-0">
                    <div className='m-3'>
                        <Table responsive striped hover>

                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">cpf/cnpj</th>
                                    <th scope="col">Pedidos</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes ? clientes.map((item, key) =>
                                    <tr key={key} className="align-middle">
                                        <td className="text-nowrap">
                                            <div className="d-flex align-items-center">
                                                <div className="ms-2">{item.nome}</div>
                                            </div>
                                        </td>
                                        <td className="text-nowrap">{item.cpfcnpj}</td>
                                        <td className="text-nowrap">12</td>

                                        <td className="text-nowrap">
                                            <Button onClick={() => {handleEditClieteModal(item.id)}}>
                                                <BiEdit />
                                            </Button>
                                        </td>
                                    </tr>
                                ) : <></>

                                }

                            </tbody>
                        </Table>
                        <div className="flex">
                            <nav aria-label="Produtos">
                                <ul className="pagination">
                                    {links && links.map((item, key) =>
                                        <li value={item.label} key={key} onClick={() => setLink(item.url)} className="page-item">
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
                    <Modal fullscreen={true} show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Row>
                                <Modal.Title>Pesquisar cliente</Modal.Title>
                            </Row>

                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form.Control onChange={handleSearch} id="search" placeholder="Nome do cliente" />
                                </Col>
                            </Row>
                            <Row>
                                <Table responsive striped hover>

                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">cpf/cnpj</th>
                                            <th scope="col">Pedidos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClient ? filteredClient.map((item, key) =>
                                            <tr id="link-to-client" key={key} className="align-middle">
                                                <td className="text-nowrap">
                                                    <div className="d-flex align-items-center">
                                                        <div className="ms-2">{item.nome}</div>
                                                    </div>
                                                </td>
                                                <td className="text-nowrap">{item.cpfcnpj}</td>
                                                <td className="text-nowrap">12</td>
                                            </tr>
                                        ) : <></>

                                        }

                                    </tbody>
                                </Table>

                            </Row>
                        </Modal.Body>
                    </Modal>
                    <Modal fullscreen={true} show={showEditClienteModal} onHide={handleClose}>
                        
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Editar dados do cliente {identifica.nome}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-between w-100">
                                <Button onClick={() => seTipoEdite('pessoal')}>Dados Pessoais</Button> 
                                <Button onClick={() => seTipoEdite('endereco')}>Endereço</Button>
                            </div>
                            <>
                            <div className={tipoEdite === 'pessoal' ? '' : 'd-none'}>Pessoa</div>
                            <div className={tipoEdite === 'endereco' ? '' : 'd-none'}>Endereço</div>
                            </>
                        </Modal.Body>
                        
                    </Modal>
                </FalconComponentCard>
            </>
        </>

    )

}

export default ClientesInfo;
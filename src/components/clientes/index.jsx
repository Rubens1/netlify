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
import Nav from 'react-bootstrap/Nav';
import { faUser, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMaskInput } from 'react-imask';
import { api } from "api/api";

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
    const [tipoEdite, setTipoEdite] = useState('pessoal');
    const [clienteSelecionado, setclienteSelecionado] = useState();
    const [listaDeEnderecos, setListaDeEnderecos] = useState();
    const [enderecoId, setEnderecoId] = useState();
    const [enderecoSelecionado, setEnderecoSelecionado] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const id = Number(enderecoId);

        if(enderecoId == null || !enderecoId) {
            setEnderecoSelecionado(null)
        }

        if (Number.isInteger(id)) {
            api.get(`endereco/${id}`)
                .then((response) => {
                    setEnderecoSelecionado(prevState => response.data)
                })
        }

        axios.get(`${link ?? process.env.REACT_APP_API_URL + "pessoas-lista-paginada?page=1"}`, {
        })
            .then(response => {
                setCurrentPage(response.data.current_page)
                setClientes(response.data.data);
                setLinks(response.data.links);
            });


        const search = document.getElementById("nome");

    }, [link, enderecoId, enderecoSelecionado])


    console.log(enderecoId);

    const redirectToAddressForm = () => {
        localStorage.setItem("user_id", clienteSelecionado.id);

        navigate("/cadastrar-endereco")
    }

    const handleSubmit = () => {

    }

    const handleAddSubmit = () => {

    }
    const handleChange = () => {

    }
    const handleClose = () => {
        setShow(false)
        setShowEditClienteModal(false)
        setListaDeEnderecos('')
        setTipoEdite('pessoal')
        setEnderecoId(null)
    };

    const handleEditClieteModal = async (item) => {
        setclienteSelecionado(item);
        const res = await fetch(`${process.env.REACT_APP_API_URL}pessoa/${item.id}`)
        const data = await res.json()
        setIdentifica(data)
        setShowEditClienteModal(true)
    }

    const handleShow = (e) => {
        setShow(true)
        //setIdentifica(e)
    };

    const handleWithAddresses = (id) => {
        setTipoEdite("endereco")
        api.get(`enderecos-cliente/${id}`)
            .then((response) => {
                setListaDeEnderecos(response.data)
            })

    }

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
                                            <Button onClick={() => { handleEditClieteModal(item) }}>
                                                <BiEdit />
                                            </Button>
                                            {/*  <Button onClick={() => desativar(item.id)} className='btn btn-danger ms-3 text-nowrap'>
                                                <AiOutlineDelete />
                                            </Button> */}
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
                    <Modal className="d-flex flex-col" fullscreen={true} show={showEditClienteModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Editar dados do cliente {clienteSelecionado && clienteSelecionado.nome}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex">
                                <Nav defaultActiveKey="/home" className="flex-column">
                                    <Nav.Link
                                        onClick={() => setTipoEdite("pessoal")}
                                        style={{ color: tipoEdite == "pessoal" ? "white" : "" }}
                                        eventKey="link-1"
                                    >
                                        <FontAwesomeIcon className="mx-2" height={10} icon={faUser} />
                                        <span className="active">Dados pessoais</span>
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => handleWithAddresses(clienteSelecionado.id)}
                                        style={{ color: tipoEdite == "endereco" ? "white" : "" }} eventKey="link-2">
                                        <FontAwesomeIcon className="mx-2" height={10} icon={faHouseUser} />
                                        <span className="active">Endereço</span>

                                    </Nav.Link>
                                </Nav>
                                {tipoEdite == "pessoal" &&
                                    <>
                                        <Col>
                                            <Form className="container w-75">
                                                <Card className="p-4 mb-4">
                                                    <h4>Dados pessoais</h4>
                                                </Card>
                                                <Row className="mb-2">
                                                    <Col xs={4}>
                                                        <Form.Label>
                                                            Nome:
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Digite o nome"
                                                            id="nome"
                                                            name="nome"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.nome : ""}

                                                        />

                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Label>
                                                            Email:
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Digite o email"
                                                            id="email"
                                                            name="email"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.email : ""}

                                                        />

                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col xs={4}>
                                                        <Form.Label>
                                                            Apelido
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Apelido"
                                                            id="alias"
                                                            name="alias"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.alias : ""}

                                                        />
                                                    </Col>
                                                    <Col xs={3}>
                                                        <Form.Label>
                                                            Celular:
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            placeholder="Digite o celular"
                                                            id="celular"
                                                            name="celular"
                                                            as={IMaskInput}
                                                            mask="(00) 0 0000-0000"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.celular : ""}

                                                        />
                                                    </Col>
                                                    <Col xs={3}>
                                                        <Form.Label>
                                                            Telefone:
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            placeholder="Digite o telefone"
                                                            id="telefone"
                                                            name="telefone"
                                                            as={IMaskInput}
                                                            mask="(00) 0000-0000"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.telefone : ""}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-4">
                                                    <Col xs={4}>
                                                        {clienteSelecionado && clienteSelecionado.tipo == "PF" ?
                                                            <>
                                                                <Form.Label>
                                                                    CPF
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Digite o CPF"
                                                                    id="cpfcnpj"
                                                                    name="cpfcnpj"
                                                                    as={IMaskInput}
                                                                    mask="000.000.000-00"
                                                                    defaultValue={clienteSelecionado.cpfcnpj}
                                                                />
                                                            </> :
                                                            <></>}
                                                        {clienteSelecionado && clienteSelecionado.tipo == "PJ" ?
                                                            <>
                                                                <Form.Label>
                                                                    CNPJ
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as={IMaskInput}
                                                                    mask="00.000.000/000-00"
                                                                    id="cpfcnpj"
                                                                    name="cpfcnpj"
                                                                    type="text"
                                                                    placeholder='Digite o CNPJ'
                                                                    defaultValue={clienteSelecionado.cpfcnpj}
                                                                />
                                                            </> :
                                                            <></>}
                                                    </Col>
                                                    <Col xs={6}>
                                                        {clienteSelecionado && clienteSelecionado.tipo == "PJ" ?
                                                            <>
                                                                <Form.Label>
                                                                    Razão Social
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Digite a razão social"
                                                                    id="cpfcnpj"
                                                                    name="cpfcnpj"
                                                                    defaultValue={clienteSelecionado.razao_social}
                                                                />
                                                            </> :
                                                            <></>}
                                                    </Col>
                                                </Row>
                                                <Button>
                                                    Atualizar dados pessoais
                                                </Button>
                                            </Form>
                                        </Col>
                                    </>
                                }
                                {tipoEdite == "endereco" &&
                                    <>
                                        <Form className="container w-75" onSubmit={handleAddSubmit}>
                                            <Card className="p-4 d-flex flex-row mb-4">
                                                <h4>Endereços</h4>
                                                <div className="">

                                                </div>
                                            </Card>

                                            <Form.Group >
                                                <Row>
                                                    {listaDeEnderecos && listaDeEnderecos.quantidade == 0 ?
                                                        <>
                                                            <p>Não há endereços cadastrados para esse cliente</p>
                                                        </>
                                                        :
                                                        <>
                                                            <Form.Group>
                                                                <Form.Label>
                                                                    Lista de endereços:
                                                                </Form.Label>
                                                                <Form.Select value={enderecoId} onChange={e => setEnderecoId(e.target.value)}>
                                                                    <option value={null}>Selecione o endereço</option>
                                                                    {listaDeEnderecos && listaDeEnderecos.enderecos.map((item, key) =>
                                                                        <option key={key} value={item.id}>
                                                                            {item.identificacao}
                                                                        </option>
                                                                    )}
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </>

                                                    }
                                                </Row>
                                                <Row>
                                                    <Col xs={6}>
                                                        <Form.Label>
                                                            CEP:
                                                        </Form.Label>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            id="cep"
                                                            as={IMaskInput}
                                                            type='text'
                                                            mask="00000-000"
                                                            defaultValue={enderecoSelecionado && enderecoSelecionado.cep}
                                                        >

                                                        </Form.Control>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Label>
                                                            Número:
                                                        </Form.Label>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            id="numero"
                                                            type='text'
                                                            defaultValue={enderecoSelecionado && enderecoSelecionado.numero}

                                                        >

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                            <Form.Group className="mb-3">

                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Row>
                                                    <Col xs={7}>
                                                        <Form.Label>Endereco:</Form.Label>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            id="logradouro"
                                                            name="logradouro"
                                                            type="text"
                                                            defaultValue={enderecoSelecionado && enderecoSelecionado.logradouro}

                                                        />
                                                    </Col>
                                                    <Col xs={5}>
                                                        <Form.Label>Complemento:</Form.Label>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            id="complemento"
                                                            name="complemento"
                                                            type="text"
                                                            defaultValue={enderecoSelecionado && enderecoSelecionado.complemento}

                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                            <Form.Group>
                                                <Row>
                                                    <Col xs={6}>
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>Bairro:
                                                            </Form.Label>
                                                            <Form.Control
                                                                onChange={handleChange}
                                                                id="bairro"
                                                                as={IMaskInput}
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.bairro}

                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>Cidade
                                                            </Form.Label>
                                                            <Form.Control
                                                                onChange={handleChange}
                                                                id="cidade"
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.cidade}

                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                            <Form.Group>
                                                <Row className='mb-4'>
                                                    <Col xs={2} >
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>estado:</Form.Label>
                                                            <Form.Control
                                                                style={{
                                                                    width: "80px"
                                                                }}
                                                                onChange={handleChange}
                                                                maxLength="2"
                                                                minLength="2"
                                                                id="estado"
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.estado}

                                                            />

                                                        </Form.Group>

                                                    </Col>
                                                    <Col xs={10} >
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>Ponto de referencia:</Form.Label>
                                                            <Form.Control
                                                                onChange={handleChange}
                                                                id="obs"
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.obs}

                                                            />

                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group>
                                                <Row className='mb-4'>
                                                    <Col xs={6} >
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>Responsável pela entrega:</Form.Label>
                                                            <Form.Control
                                                                onChange={handleChange}
                                                                id="responsavel"
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.responsavel}

                                                            />

                                                        </Form.Group>

                                                    </Col>
                                                    <Col xs={6} >
                                                        <Form.Group aria-label="Tipo de cadastro">
                                                            <Form.Label>Identificação:</Form.Label>
                                                            <Form.Control
                                                                onChange={handleChange}
                                                                id="nome"
                                                                type='text'
                                                                defaultValue={enderecoSelecionado && enderecoSelecionado.identificacao}

                                                            />

                                                        </Form.Group>

                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group>
                                                <Row className='mb-4'>
                                                    <Col xs={10} >
                                                        <Form.Group>
                                                            {
                                                                listaDeEnderecos && listaDeEnderecos.quantidade >= 1
                                                                    ?
                                                                    <>
                                                                        <Button style={{ marginRight: "10px" }}>
                                                                            Atualizar endereço selecionado
                                                                        </Button>
                                                                        <Button
                                                                            onClick={redirectToAddressForm}
                                                                        >
                                                                            Cadastrar novo endereço
                                                                        </Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Button>
                                                                            Cadastrar endereço
                                                                        </Button>
                                                                    </>

                                                            }
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Form>
                                    </>
                                }
                            </div>
                        </Modal.Body>

                    </Modal>
                </FalconComponentCard>
            </>
        </>

    )

}

export default ClientesInfo;
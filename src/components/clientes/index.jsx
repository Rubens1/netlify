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
import { toast } from "react-toastify";

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
    const [enderecoAtualizado, setEnderecoAtualizado] = useState();
    const [dadosAtualizado, setDadosAtualizado] = useState();
    const [freshData, setFreshData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const id = Number(enderecoId);

        if (enderecoId == null || !enderecoId) {
            setEnderecoSelecionado(null)
        }

        if (Number.isInteger(id)) {
            api.get(`endereco/${id}`)
                .then((response) => {
                    setEnderecoSelecionado(prevState => response.data)
                })
        }
    }, [enderecoId])

    useEffect(() => {

        axios.get(`${link ?? process.env.REACT_APP_API_URL + "pessoas-lista-paginada?page=1"}`, {
        })
            .then(response => {
                setCurrentPage(response.data.current_page)
                setClientes(response.data.data);
                setLinks(response.data.links);
            });


        const search = document.getElementById("nome");

    }, [link, freshData])


    const redirectToAddressForm = () => {
        localStorage.setItem("user_id", clienteSelecionado.id);

        navigate("/cadastrar-endereco")
    }

    const handleDadosChange = (e) => {
        e.preventDefault();

        const key = e.target.id;
        const value = e.target.value;

        if (key == "data_n") {
            const date_input = document.getElementById("data_n").value;

            if (date_input.length == 10) {

                const day = date_input.split("/")[0];
                const month = date_input.split("/")[1];
                const year = date_input.split("/")[2];

                const data_nasc = {
                    "data_nasc": `${year}${month}${day}`
                }

                setDadosAtualizado(dadosAtualizado => ({
                    ...dadosAtualizado,
                    ...data_nasc
                }));
            }
        }


        setDadosAtualizado(dadosAtualizado => ({
            ...dadosAtualizado,
            [key]: value
        }));
    }

    const handleDadosSubmit = (e) => {
        e.preventDefault();

        api.put(`editar-pessoa/${clienteSelecionado.id}`, dadosAtualizado)
            .then((response) => {
                setFreshData(true);
                toast.success(`Dados do ${clienteSelecionado.nome.split(" ")[0]} atualizado com sucesso`, {
                    theme: 'colored',
                    position: "top-right"
                });
            })
            .catch((error) => {
                const e = error.response.data.errors

                Object.keys(e).map(i => {
                    toast.error(e[`${i}`][0].replace("campo", " "), {
                        theme: 'colored',
                        position: "top-right"
                    });
                })
            })
    }

    const handleEnderecoChange = (e) => {
        e.preventDefault();

        const key = e.target.id;
        const value = e.target.value;

        setEnderecoAtualizado(enderecoAtualizado => ({
            ...enderecoAtualizado,
            [key]: value
        }));

    }

    const handleClose = () => {
        setShow(false)
        setShowEditClienteModal(false)
        setListaDeEnderecos('')
        setTipoEdite('pessoal')
        setEnderecoId(null)
        setFreshData(false)
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


    console.log(listaDeEnderecos);
    
    const submitAddressEdit = (e) => {

        api.put(`editar-endereco/${enderecoSelecionado.id}`, enderecoAtualizado)
            .then((response) => {
                toast.success("Dados de endereço atualizado.", {
                    theme: 'colored',
                    position: "top-right"
                });
            })
            .catch((error) => {
                toast.error("Erro ao atualizar dados endereço tente mais tarde", {
                    theme: 'colored',
                    position: "top-right"
                });
            })
    }

    const handleWithAddresses = (id) => {
        setTipoEdite("endereco")
        api.get(`enderecos-cliente/${id}`)
            .then((response) => {
                console.log(response)
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

    const date = new Date(clienteSelecionado && clienteSelecionado.data_nasc);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <>
            <>
                <PageHeader title="Lista de clientes" className="mb-3" />
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
                                    <th scope="col">CPF/CNPJ</th>
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
                                            <th scope="col">CPF/CNPJ</th>
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
                                Editar dados do cliente {" "}
                                {clienteSelecionado && clienteSelecionado.nome.split(" ")[0]}
                                {clienteSelecionado && clienteSelecionado.tipo == "PJ" ? ` da empressa ${clienteSelecionado.razao_social ?? ""}` : ""}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex">
                                <Nav defaultActiveKey="/home" className="flex-column">
                                    <Nav.Link
                                        onClick={() => setTipoEdite("pessoal")}
                                        style={{ color: tipoEdite == "pessoal" ? "var(--falcon-green)" : "var(--falcon-secondary)" }}
                                        eventKey="link-1"
                                    >
                                        <FontAwesomeIcon className="mx-2" height={10} icon={faUser} />
                                        <span className="active">Dados pessoais</span>
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => handleWithAddresses(clienteSelecionado.id)}
                                        style={{ color: tipoEdite == "endereco" ? "var(--falcon-green)" : "var(--falcon-secondary)" }} eventKey="link-2">
                                        <FontAwesomeIcon className="mx-2" height={10} icon={faHouseUser} />
                                        <span className="active">Endereço</span>

                                    </Nav.Link>
                                </Nav>
                                {tipoEdite == "pessoal" &&
                                    <>
                                        <Col>
                                            <Form onSubmit={handleDadosSubmit} className="container w-75">
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
                                                            onChange={handleDadosChange}
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
                                                            onChange={handleDadosChange}
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
                                                            onChange={handleDadosChange}
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
                                                            onChange={handleDadosChange}
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
                                                            onChange={handleDadosChange}
                                                            mask="(00) 0000-0000"
                                                            defaultValue={clienteSelecionado ? clienteSelecionado.telefone : ""}

                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    {clienteSelecionado && clienteSelecionado.tipo == "PJ" ?
                                                        <>
                                                            <Col xs={5}>
                                                                <Form.Label>
                                                                    CCM:
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="ccm"
                                                                    as={IMaskInput}
                                                                    mask="0.000.00-0"
                                                                    placeholder="Digite o CCM"
                                                                />
                                                            </Col>
                                                            <Col xs={4}>
                                                                <Form.Label>
                                                                    Inscrição estadual:
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="ie"
                                                                    placeholder="Digite a inscrição estadual"
                                                                />
                                                            </Col>
                                                        </>
                                                        : <></>

                                                    }
                                                </Row>
                                                <Row>
                                                    {clienteSelecionado && clienteSelecionado.tipo == "PF" &&
                                                        <>
                                                            <Col xs={3}>
                                                                <Form.Label>
                                                                    Sexo:
                                                                </Form.Label>
                                                                <Form.Select defaultValue={clienteSelecionado.sexo}>
                                                                    <option value="M">Masculíno</option>
                                                                    <option value="F">Feminino</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <Form.Label>
                                                                    RG:
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as={IMaskInput}
                                                                    mask="00.000.000-00"
                                                                    id="rg"
                                                                    type="text"
                                                                    defaultValue={clienteSelecionado && clienteSelecionado.rg}
                                                                    placeholder="Digite o RG"
                                                                />
                                                            </Col>
                                                            <Col xs={4}>
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        Orgão emissor:
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        id="orgao_emissor"
                                                                        onChange={handleDadosChange}
                                                                        placeholder="Digite o orgão emissor"
                                                                        defaultValue={clienteSelecionado && formattedDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <Form.Label>
                                                                    CPF:
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Digite o CPF"
                                                                    id="cpfcnpj"
                                                                    name="cpfcnpj"
                                                                    as={IMaskInput}
                                                                    mask="000.000.000-00"
                                                                    onChange={handleDadosChange}
                                                                    defaultValue={clienteSelecionado ? clienteSelecionado.cpf : ""}

                                                                />
                                                            </Col>

                                                            <Col xs={4}>
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        Data de nascimento:
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        as={IMaskInput}
                                                                        mask="00/00/0000"
                                                                        type="text"
                                                                        id="data_n"
                                                                        onChange={handleDadosChange}
                                                                        placeholder="00/00/0000"
                                                                        defaultValue={clienteSelecionado && formattedDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </>
                                                    }

                                                    <Row className="mb-4">
                                                        {clienteSelecionado && clienteSelecionado.tipo == "PJ" ?
                                                            <>
                                                                <Col xs={4}>
                                                                    <Form.Label>
                                                                        CNPJ:
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        as={IMaskInput}
                                                                        mask="00.000.000/000-00"
                                                                        id="cpfcnpj"
                                                                        name="cpfcnpj"
                                                                        type="text"
                                                                        onChange={handleDadosChange}
                                                                        placeholder='Digite o CNPJ'
                                                                        defaultValue={clienteSelecionado ? clienteSelecionado.cpfcnpj : ""}

                                                                    />
                                                                </Col>
                                                            </> :
                                                            <></>
                                                        }
                                                        {clienteSelecionado && clienteSelecionado.tipo == "PJ" ?
                                                            <>
                                                                <Col xs={5}>
                                                                    <Form.Label>
                                                                        Razão Social
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Digite a razão social"
                                                                        onChange={handleDadosChange}
                                                                        id="razao_social"
                                                                        name="cpfcnpj"
                                                                        defaultValue={clienteSelecionado && clienteSelecionado.razao_social}
                                                                    />
                                                                </Col>
                                                            </> :
                                                            <></>}

                                                    </Row>
                                                    <Row>

                                                    </Row>
                                                    <Button type="submit">
                                                        Atualizar dados pessoais
                                                    </Button>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </>
                                }
                                {tipoEdite == "endereco" &&
                                    <>
                                        <Form className="container w-75" onSubmit={submitAddressEdit}>
                                            <Card className="p-4 h-6 d-flex flex-row mb-4">
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
                                                                    <option value={null}>Selecione algum endereço</option>
                                                                    {listaDeEnderecos ? listaDeEnderecos.enderecos.map((item, key) =>
                                                                        <option key={key} value={item.id}>
                                                                            {item.identificacao}
                                                                        </option>

                                                                    ) : <></>}
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
                                                            onChange={handleEnderecoChange}
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
                                                            onChange={handleEnderecoChange}
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
                                                            onChange={handleEnderecoChange}
                                                            id="logradouro"
                                                            name="logradouro"
                                                            type="text"
                                                            defaultValue={enderecoSelecionado && enderecoSelecionado.logradouro}

                                                        />
                                                    </Col>
                                                    <Col xs={5}>
                                                        <Form.Label>Complemento:</Form.Label>
                                                        <Form.Control
                                                            onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                onChange={handleEnderecoChange}
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
                                                                        <Button
                                                                            onClick={submitAddressEdit}
                                                                            style={{ marginRight: "10px" }}>
                                                                            Atualizar endereço selecionado
                                                                        </Button>
                                                                        <Button
                                                                            type="submit"
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
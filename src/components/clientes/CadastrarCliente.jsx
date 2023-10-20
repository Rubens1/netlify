import React, { useEffect, useContext, createContext } from 'react';
import { Button, Card, Col, Row, Form, ButtonGroup } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import TinymceEditor from 'components/common/TinymceEditor';
import axios from "axios";
import { useState } from 'react';
import InputMask from 'react-input-mask';
import CadastrarEndereco from './CadastrarEndereco';
import { IMaskInput } from "react-imask";
import { FormContext } from 'context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CadastraCliente = () => {
    const navigate = useNavigate();
    const [tipoDeCadastro, setTipoDeCadastro] = useState();
    const [dadosFormulario, setDadosFormulario] = useState([]);
    const [passo, setPasso] = useState("dados_pessoais")

    console.log(tipoDeCadastro);
    const handleChange = (e) => {
        e.preventDefault();

        const key = e.target.id;
        const value = e.target.value;


        if (key == "data_n") {
            const date_input = document.getElementById("data_n").value;
            if (date_input.length == 10) {

                const day = date_input.split("/")[0];
                const month = date_input.split("/")[1];
                const year = date_input.split("/")[2];

                const data_nasc = { "data_nasc": `${year}${month}${day}` }

                setDadosFormulario(dadosFormulario => ({
                    ...dadosFormulario,
                    ...data_nasc
                }));
            }
        }

        setDadosFormulario(dadosFormulario => ({
            ...dadosFormulario,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}pessoa-cadastro`, dadosFormulario)
            .then(response => {
                console.log(response);
                localStorage.setItem("user_id", response.data.pessoa.id);

                toast.success("Usúario criado com suscesso", {
                    theme: 'colored',
                    position: "top-right"
                });

                return navigate("/cadastrar-endereco")
            })
            .catch(error => {
                console.log(error);

                const e = error.response.data.errors;

                Object.keys(e).map(i => {
                    toast.error(e[`${i}`][0], {
                        theme: 'colored',
                        position: "top-right"
                    });
                })
            })
    }

    const clickTipo = (e) => {
        setTipoDeCadastro(e.value)
    }

    return (
        <div id="user_container">
            <PageHeader title="Cadastro de cliente" className="mb-3"> </PageHeader>
            <Card className='p-3'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Form.Select id="tipo" onChange={handleChange} aria-label="Tipo de cadastro" onClick={(e) => clickTipo(e.target)}>
                                    <option value="" >
                                        Selecione o tipo de cadastro

                                    </option>
                                    <option value="PF">CPF</option>
                                    <option value="PJ">CNPJ</option>
                                </Form.Select>
                            </Col>
                            <Col xs={6}>
                                <Form.Group
                                    className="mb-3"
                                >
                                    {tipoDeCadastro == "PF" &&
                                        <Form.Control
                                            onChange={handleChange}
                                            as={IMaskInput}
                                            mask="000.000.000-00"
                                            id="cpfcnpj"
                                            name="cpfcnpj"
                                            type="text"
                                            placeholder='Digite o cpf'
                                        />
                                    }
                                    {tipoDeCadastro == "PJ" &&
                                        <Form.Control
                                            onChange={handleChange}
                                            as={IMaskInput}
                                            mask="00.000.000/000-00"
                                            id="cpfcnpj"
                                            name="cpfcnpj"
                                            type="text"
                                            placeholder='Digite o CNPJ'
                                            required
                                        />
                                    }
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form.Group>
                    <Form.Group>

                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder="Digite o nome do cliente"
                            required
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        {tipoDeCadastro == "PJ" &&
                            <>
                                <Form.Label>Razão social</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    id="razao_social"
                                    name="razao_social"
                                    type="text"
                                    placeholder="Digite a Razão social ou nome da empresa"
                                    required
                                />
                            </>
                        }

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Digite o email do cliente"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Form.Group aria-label="Tipo de cadastro">
                                    <Form.Label>Telefone
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        id="telefone"
                                        as={IMaskInput}
                                        mask="(00) 0000-0000"
                                        type='text'
                                        placeholder="Digite número de telefone" />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group aria-label="Tipo de cadastro">
                                    <Form.Label>Celular
                                    </Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        id="celular"
                                        as={IMaskInput}
                                        mask="(00) 0 0000-0000"
                                        type='text'
                                        placeholder="Digite o número de celular"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    {tipoDeCadastro == "cpf" ?
                        <>
                            <Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>Data de nascimento:
                                            </Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                id="data_n"
                                                as={IMaskInput}
                                                mask="00/00/0000"
                                                type='text'
                                                placeholder="Digite a data de nascimento"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>RG
                                            </Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                id="rg"
                                                as={IMaskInput}
                                                mask="00.000.000-00"
                                                type='text'
                                                placeholder="Digite o RG" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>Orgão emissor
                                            </Form.Label>
                                            <Form.Control type='text' placeholder="Digite o orgão emissor" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>Sexo:
                                            </Form.Label>
                                            <Form.Select onChange={handleChange}
                                            >
                                                <option>Selecione o sexo</option>
                                                <option value="M">Masculino</option>
                                                <option value="F">Feminino</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>Estado civil:
                                            </Form.Label>
                                            <Form.Select id="estado_cvil" onChange={handleChange}>
                                                <option>Selecione</option>
                                                <option value="M">Solteiro (a)</option>
                                                <option value="F">Casado (a)</option>
                                                <option value="">Viúvo (a)</option>
                                                <option value="">Prefiro não informar</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </>
                        : <>
                            <Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group aria-label="Tipo de cadastro">
                                            <Form.Label>IE
                                            </Form.Label>
                                            <Form.Control type='text' placeholder="Insira o IE" required />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Form.Group>
                        </>

                    }
                    <Form.Group>
                        <Row className='mb-4'>
                            <Col xs={6} >
                                <Form.Group aria-label="Tipo de cadastro">
                                    <Form.Label>CPF responsável:</Form.Label>
                                    <Form.Control
                                        id="cpf_responsavel"
                                        as={IMaskInput}
                                        mask="000.000.000-00"
                                        type='text'
                                        placeholder='Digite o CPF do responsável.'
                                        required
                                    />

                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row className='mb-4'>
                            <Col xs={6} >
                                <Form.Group>
                                    <Button
                                        type='submit'>
                                        Cadastrar cliente
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    );

};

export default CadastraCliente
import React, { useEffect, useContext } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import TinymceEditor from 'components/common/TinymceEditor';
import axios from "axios";
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { FormContext } from 'context/Context';
import { IMaskInput } from 'react-imask';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const CadastrarEndereco = ({ props }) => {
    const navigate = useNavigate();
    const [cep, setCep] = useState();

    let pessoa_id = { "id_pessoa": localStorage.getItem("user_id") }
    const [dadosFormulario, setDadosFormulario] = useState(dadosFormulario => ({
        ...pessoa_id
    }));

    console.log(dadosFormulario);

    const handleCep = (e) => {
        const cep = e.target.value;

        if (cep.length < 9) {
            document.getElementById("logradouro").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("estado").value = "";
        }

        if (cep.length == 9) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    console.log(response.data)
                    if (Boolean(response.data.erro) == true) {
                        setDadosFormulario('')
                        toast.error("Cep invalído", {
                            theme: 'colored',
                            position: "top-right"
                        });

                        return 0;
                    }

                    document.getElementById("logradouro").value = response.data.logradouro ?? null;
                    document.getElementById("bairro").value = response.data.bairro ?? null;
                    document.getElementById("cidade").value = response.data.localidade ?? null;
                    document.getElementById("estado").value = response.data.uf ?? null;

                    setDadosFormulario(response.data ? {
                        ...dadosFormulario,
                        cep: response.data.cep,
                        logradouro: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                        estado: response.data.uf
                    } : null)
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}cadastrar-endereco-cliente`, dadosFormulario)
            .then(response => {
                console.log(response);

                toast.success("Endereço criado com suscesso", {
                    theme: 'colored',
                    position: "top-right"
                });

                return navigate("/")
            })
            .catch((error) => {

                const e = error.response.data.errors;

                localStorage.removeItem("user_id");

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


        setDadosFormulario(dadosFormulario => ({
            ...dadosFormulario,
            [key]: value
        }));

    }

    return (
        <>
            <PageHeader title="Cadastro de endereço" className="mb-3"> </PageHeader>
            <Card className='p-3'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Form.Label>
                                    CEP:
                                </Form.Label>
                                <Form.Control
                                    onChange={handleCep}
                                    id="cep"
                                    as={IMaskInput}
                                    type='text'
                                    mask="00000-000"
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
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Complemento:</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    id="complemento"
                                    name="complemento"
                                    type="text"
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
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row className='mb-4'>
                            <Col xs={2} >
                                <Form.Group aria-label="Tipo de cadastro">
                                    <Form.Label>Estado:</Form.Label>
                                    <Form.Control
                                        style={{
                                            width: "80px"
                                        }}
                                        onChange={handleChange}
                                        maxLength="2"
                                        minLength="2"
                                        id="estado"
                                        type='text'
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
                                    />

                                </Form.Group>

                            </Col>
                            <Col xs={6} >
                                <Form.Group aria-label="Tipo de cadastro">
                                    <Form.Label>Identificação:</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        id="identificacao"
                                        type='text'
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
                                        Cadastrar endereço
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Card>
        </>
    );

}

export default CadastrarEndereco;

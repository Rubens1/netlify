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
    let pessoa_id = { "id_pessoa": localStorage.getItem("user_id") }
    const [dadosFormulario, setDadosFormulario] = useState(dadosFormulario => ({
        ...pessoa_id
    }));

    useEffect(() => {
        const cep = document.getElementById("cep");

        cep.addEventListener("focusout", () => {
            if (cep.value == null || !cep.value || cep.value.length < 9) {
                alert("Cep invalído")
                return 0;
            }

            axios.get(`https://viacep.com.br/ws/${cep.value}/json/`)
                .then(response => {
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
        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}cadastrar-endereco`, dadosFormulario)
            .then(response => {
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
                                    onChange={handleChange}
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
                                        id="nome"
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

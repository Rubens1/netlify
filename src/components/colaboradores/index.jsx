import React, { useState } from "react";
import { Button, Table, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import Select from 'react-select';
import { Link } from "react-router-dom";

const ColaboradoresInfo = () => {
    const [selecao, setSelecao] = useState(null);
    const [permissoes, setPermissoes] = useState({});
    const [sessao, setSessao] = useState()
    const [permicao, setPermicao] = useState()

    const organizerOptions = [
        { value: '1', label: 'Cliente' },
        { value: '2', label: 'Categoria' },
        { value: '3', label: 'Pedidos' },
        { value: '4', label: 'Produto' }
    ];

    const cadastro = async (e) => {
        e.preventDefault();
        let nome = e.target.nome.value;
        let email = e.target.email.value;
        let senha = e.target.senha.value;
                         
        const sessaoDados = selecao.map((item) => {        
        return item.label;
        
        })

        const permissoesDados = selecao.map((item) => {        
            return permissoes[item.value]
        })
    
        console.log("Nome: " + nome + " Email: " + email + " Senha: " + senha + " Sessão: " + JSON.stringify(sessaoDados) + " Permissões: " + JSON.stringify(permissoesDados));
        const dadosEnviar = {nome: nome, email: email, senha: senha, sessao: JSON.stringify(sessaoDados), array_permissoes: JSON.stringify(permissoesDados)}
        // Agora você pode enviar 'dadosParaEnviar' para o servidor
      
        // Envie 'dadosParaEnviar' para o servidor usando uma chamada de API, por exemplo:
        // axios.post('/api/colaborador', dadosParaEnviar)
        //   .then((response) => {
        //     console.log('Colaborador cadastrado com sucesso:', response.data);
        //     // Faça o que for necessário após o cadastro
        //   })
        //   .catch((error) => {
        //     console.error('Erro ao cadastrar o colaborador:', error);
        //   });
      };

    const handlePermissaoChange = (itemId, permissaoTipo, isChecked) => {
        setPermissoes((prevPermissoes) => ({
          ...prevPermissoes,
          [itemId]: {
            ...prevPermissoes[itemId],
            [permissaoTipo]: isChecked,
          },
        }));
      };
    return (
        <>
            <PageHeader title="Cadastra Colaborador" className="mb-3" ></PageHeader>
            <Card className='p-3'>
                <Row>
                    <Col sm={12} className="d-flex justify-content-end"><Link href="#" alt="Lista de colaboradores">Lista de Colaboradores</Link></Col>
                </Row>
                <Form onSubmit={e => cadastro(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            placeholder="Digita o nome"
                            name="nome"
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="Digita o email"
                            name="email"
                            type="email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            placeholder="Digita a senha"
                            name="senha"
                            type="password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Permissões</Form.Label>
                        <Select
                            name="permicoes"
                            closeMenuOnSelect={false}
                            options={organizerOptions}
                            placeholder='Selecione...'
                            isMulti
                            classNamePrefix="react-select"
                            value={selecao}
                            onChange={value => setSelecao(value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col sm={6}>
                                <Form.Label>Todos(as)</Form.Label>
                            </Col>
                            <Col sm={6}>
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    id='item1CheckListaTodos'
                                    label="Lista"
                                    name="lista"
                                    value="todos"
                                />
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    id='item1CheckCadastrarTodos'
                                    label="Cadastrar"
                                    name="cadastrar"
                                    value="todos"
                                />
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    id='item1CheckEditarTodos'
                                    label="Editar"
                                    name="editar"
                                    value="todos"
                                />
                                <Form.Check
                                    inline
                                    type='checkbox'
                                    id='item1CheckDeletarTodos'
                                    label="Deletar"
                                    name="deletar"
                                    value="todos"
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    {selecao && selecao.map((item, key) => {
                        const itemId = item.value;
                        return (<div key={item.value}>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label>{item.label}</Form.Label>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Check
                                            inline
                                            type='checkbox'
                                            onChange={(e) => handlePermissaoChange(itemId, "listar", e.target.checked)}
                                            id={`item1CheckLista-${key}`}
                                            label="Lista"
                                            name={`lista-${itemId}`}                                           
                                        />
                                        <Form.Check
                                            inline
                                            type='checkbox'
                                            onChange={(e) => handlePermissaoChange(itemId, "cadastrar", e.target.checked)}
                                            id={`item1CheckCadastrar-${key}`}
                                            label="Cadastrar"
                                            name={`cadastrar-${itemId}`}
                                            />
                                        <Form.Check
                                            inline
                                            type='checkbox'
                                            onChange={(e) => handlePermissaoChange(itemId, "editar", e.target.checked)}
                                            id={`item1CheckEditar-${key}`}
                                            label="Editar"
                                            name={`editar-${itemId}`}
                                            />
                                        <Form.Check
                                            inline
                                            type='checkbox'
                                            onChange={(e) => handlePermissaoChange(itemId, "deletar", e.target.checked)}
                                            id={`item1CheckDeletar-${key}`}
                                            label="Deletar"
                                            name={`deletar-${itemId}`}
                                            />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </div>)
                    })}
                    <Form.Group>
                        <Button
                            type='submit'>
                            Cadastrar Colaborador
                        </Button>
                    </Form.Group>
                </Form>
            </Card>

        </>
    )
}

export default ColaboradoresInfo;
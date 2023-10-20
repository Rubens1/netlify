import Divider from 'components/common/Divider';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ hasLabel, layout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('tokenUser');

    if (token) {
      navigate("/")
    }

    if (localStorage.getItem("emailStorage") && localStorage.getItem("senhaStorage")) {
      formData.email = localStorage.getItem("emailStorage");
      formData.senha = localStorage.getItem("senhaStorage");
      formData.remember = true;
    } else {
      formData.remember = false;
    }

  }, [])

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    remember: false
  });

  // Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const senha = formData.senha;

    axios.post(`${process.env.REACT_APP_API_URL}pessoa-entrar`, {
      email: email,
      senha: senha
    }).then((response) => {
      const token = JSON.stringify(response.data.authorization.token);

      localStorage.setItem('tokenUser', token.replace(/"/g, ''));
      
      navigate("/")

    }).catch(error => {
      toast.error(error.response.data.error, {
        theme: 'colored',
        position: "top-right"
      });
    }).catch(error => {
      toast.error('Erro na conexão com o servidor', {
        theme: 'colored',
        position: "top-right"
      });
    })
  };

  const handleFieldChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const lembrete = (e) => {
    if (formData.remember == false) {
      localStorage.setItem('emailStorage', formData.email);
      localStorage.setItem('senhaStorage', formData.senha);
      formData.remember = true;
    } else {
      localStorage.removeItem("emailStorage");
      localStorage.removeItem("senhaStorage");
      formData.remember = false;
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Senha</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Senha' : ''}
          value={formData.senha}
          name="senha"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
              onClick={e => lembrete(e)}
            />
            <Form.Check.Label className="mb-0 text-700" >
              Lembrar da senha
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/recupera-senha`}
          >
            Esqueceu a sua senha?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.senha}
        >
          Entrar
        </Button>
      </Form.Group>
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;

import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import Landing from 'components/pages/landing/Landing';

import EmailDetail from 'components/app/email/email-detail/EmailDetail';
import Inbox from 'components/app/email/inbox/Inbox';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

import Dashboard from 'components/dashboards/default';

import ListaProdutos from 'components/produtos/lista';
import CadastrarProduto from 'components/produtos/CadastrarProduto';
import LoginPainel from 'login';
import Kanban from 'components/app/kanban/Kanban';

import { useEffect } from 'react';
import ColaboradoresInfo from 'components/colaboradores';
import MeuPerfil from 'components/meu-perfil';
import ProducaoInfo from 'components/producao';
import CategoriaInfo from 'components/categoria/CategoriaInfo';
import CategoriaCadastro from 'components/categoria/CategoriaCadastro';
import ClientesInfo from 'components/clientes';
import AfiliadosInfo from 'components/afiliados';
import PontoInfo from 'components/ponto-de-apoio';
import ParceirosInfo from 'components/parceiros';
import SitesInfo from 'components/sites';
import ConfiguracaoInfo from 'components/configuracao';
import FreteInfo from 'components/recursos/frete';
import PagamentoInfo from 'components/recursos/pagamento';
import CardForgetPassword from 'components/authentication/card/ForgetPassword';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import SplitForgetPassword from 'components/authentication/split/ForgetPassword';
import PedidosInfo from 'components/pedidos/lista';
import CadastrarPedido from 'components/pedidos/cadastrar';
import CadastraCliente from 'components/clientes/CadastrarCliente';
import CadastrarEndereco from 'components/clientes/CadastrarEndereco';
import axios from 'axios';

const FalconRoutes = () => {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const refreshToken = async () => {
    if (localStorage.getItem("tokenUser")) {
      setInterval(() => {
        axios.put(`${process.env.REACT_APP_API_URL}pessoa-atualizar`, {}, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('tokenUser')}`
          }
        }).then(response => {
          localStorage.setItem("tokenUser", response.data)
        })


      }, 1000 * 60 * 60 * 2) //Duas Horas
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("tokenUser");
    const id = localStorage.getItem("user_id");

    refreshToken()

    if (id) {
      setUserId(true);
    }
    if (!isAuthenticated) {
      setToken(true)
    }

  }, [])

  return (
    <Routes>
      <Route path="landing" element={<Landing />} />
      <Route element={<ErrorLayout />}>
        <Route path="errors/404" element={<Error404 />} />
        <Route path="errors/500" element={<Error500 />} />
      </Route>

      {/* Tela de login  */}
      <Route path='login' element={<LoginPainel />} />
      <Route path='authentication/card/recupera-senha' element={<CardForgetPassword />} />
      <Route
        path="authentication/split/recupera-senha"
        element={<SplitForgetPassword />}
      />
      <Route
        path="authentication/simple/recupera-senha"
        element={<SimpleForgetPassword />}
      />
      {/* //--- MainLayout Starts  */}

      <Route element={token ? (<Navigate to="login" replace />) : (<MainLayout />)}>
        {/*Dashboard*/}
        <Route path="/" element={<Dashboard />} />

        <Route path="meu-perfil" element={<MeuPerfil />} />
        <Route path="producao" element={<ProducaoInfo />} />

        {/*Produtos*/}
        <Route path="produtos/lista" element={<ListaProdutos />} />
        <Route path="produtos/cadastrar" element={<CadastrarProduto />} />

        {/* Pedidos */}
        <Route path="pedidos/lista" element={<PedidosInfo />} />
        <Route path="pedidos/cadastrar" element={<CadastrarPedido />} />

        {/* Colaboradore */}
        <Route path="colaboradores" element={<ColaboradoresInfo />} />

        {/*Cadastros*/}
        <Route path="categoria/lista" element={<CategoriaInfo />} />
        <Route path="categoria/cadastro" element={<CategoriaCadastro />} />
        <Route path="clientes" element={<ClientesInfo />} />
        <Route path="afiliados" element={<AfiliadosInfo />} />
        <Route path="ponto-de-apoio" element={<PontoInfo />} />
        <Route path="parceiros" element={<ParceirosInfo />} />
        <Route path="sites" element={<SitesInfo />} />
        <Route path="cadastrar-cliente" element={<CadastraCliente />} />
        <Route path="cadastrar-endereco" element={userId == true ? <CadastrarEndereco /> : <Navigate replace={"/"} />} />

        {/*Configuração*/}
        <Route path="configuracao" element={<ConfiguracaoInfo />} />

        {/*Recursos*/}
        <Route path="recursos/frete" element={<FreteInfo />} />
        <Route path="recursos/pagamento" element={<PagamentoInfo />} />

        <Route path="app/kanban" element={<Kanban />} />

      </Route>

      {/* //--- MainLayout end  */}

      {/* <Navigate to="/errors/404" /> */}
      <Route path="*" element={<Navigate to="/errors/404" replace />} />
    </Routes>
  );
};

export default FalconRoutes;
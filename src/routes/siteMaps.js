export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      children: [
        {
          name: 'Início',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'Meu Perfil',
          to: '/meu-perfil',
          active: true
        },
        {
          name: 'Produção',
          to: '/producao',
          active: true
        },
        {
          name: 'Sites',
          to: '/sites',
          active: true
        }
      ]
    }
  ]
};
export const sitesRoutes = {
  label: 'Sites',
  children: [
    {
      name: 'Sites',
      icon: 'globe',
      to: '/sites',
      active: true
    }
  ]
};
export const configuracaoRoutes = {
  label: 'Configuração',
  children: [
    {
      name: 'Configuração',
      icon: 'wrench',
      to: '/configuracao',
      active: true
    }
  ]
};
export const produtosRoutes = {
  label: 'Produtos',
  children: [
    {
      name: 'Lista de Produtos',
      icon: 'list',
      to: '/produtos/lista',
      active: true
    },
    {
      name: 'Cadastrar',
      icon: 'plus',
      to: '/produtos/cadastrar',
      active: true
    }
  ]
};
export const pedidosRoutes = {
  label: 'Pedidos',
  children: [
    {
      name: 'Lista de pedidos',
      icon: 'list',
      to: '/pedidos/lista',
      active: true
    },
    {
      name: 'Criar Pedido',
      icon: 'folder-plus',
      to: '/pedidos/cadastrar',
      active: true
    }
  ]
};
export const producaoRoutes = {
  label: 'Producao',
  children: [
    {
      name: 'Produção',
      icon: 'list',
      to: '/producao',
      active: true
    }
  ]
};
export const recursosRoutes = {
  label: 'Recursos',
  children: [
    {
      name: 'Opções de frete',
      icon: 'rocket',
      to: '/recursos/frete',
      active: true
    },
    {
      name: 'Meio de pagamento',
      icon: 'file-invoice-dollar',
      to: '/recursos/pagamento',
      active: true
    }
  ]
};
export const cadastrosRoutes = {
  label: 'Cadastros',
  children: [
    {
      name: 'Categorias',
      icon: 'code-branch',
      active: true,
      children: [
        {
          name: 'Lista',
          to: '/categoria/lista',
          active: true
        },
        {
          name: 'Cadastrar',
          to: '/categoria/cadastro',
          active: true
        }
      ]
    },
    {
      name: 'Clientes',
      icon: 'user',
      to: '/clientes',
      active: true
    },
    {
      name: 'Afiliados',
      icon: 'users',
      to: '/afiliados',
      active: true
    },
    {
      name: 'Colaboradores',
      icon: 'user-circle',
      to: '/colaboradores',
      active: true
    },
    {
      name: 'Ponto de Apoio',
      icon: 'shopping-cart',
      to: '/ponto-de-apoio',
      active: true
    },
    {
      name: 'Parceiros',
      icon: 'user',
      to: '/parceiros',
      active: true
    }
  ]
};
export default [
  dashboardRoutes,
  produtosRoutes,
  pedidosRoutes,
  cadastrosRoutes,
  sitesRoutes,
  producaoRoutes,
  configuracaoRoutes,
  recursosRoutes
];

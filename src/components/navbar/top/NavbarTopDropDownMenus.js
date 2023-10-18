import React, { useContext } from 'react';
import NavbarDropdown from './NavbarDropdown';
import {
  dashboardRoutes,
  produtosRoutes,
  pedidosRoutes,
  cadastrosRoutes,
  sitesRoutes,
  producaoRoutes,
  configuracaoRoutes,
  recursosRoutes
} from 'routes/siteMaps';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarDropdownApp from './NavbarDropdownApp';
import NavbarDropdownPages from './NavbarDropdownPages';
import NavbarDropdownModules from './NavbarDropdownModules';
import AppContext from 'context/Context';

const NavbarTopDropDownMenus = () => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig
  } = useContext(AppContext);

  const handleDropdownItemClick = () => {
    if (navbarCollapsed) {
      setConfig('navbarCollapsed', !navbarCollapsed);
    }
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };
  return (
    <>
      <NavbarDropdown title="dashboard">
        {dashboardRoutes.children[0].children.map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>

      <NavbarDropdown title="produtos">
        <NavbarDropdownApp items={produtosRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="pedidos">
        <NavbarDropdownPages items={pedidosRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="mais">
        <NavbarDropdownModules items={cadastrosRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="mais">
        <NavbarDropdownModules items={sitesRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="mais">
        <NavbarDropdownModules items={producaoRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="mais">
        <NavbarDropdownModules items={configuracaoRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="mais">
        <NavbarDropdownModules items={recursosRoutes.children} />
      </NavbarDropdown>

      
    </>
  );
};

export default NavbarTopDropDownMenus;

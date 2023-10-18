import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Offcanvas, Button, ButtonGroup, Form } from 'react-bootstrap';
import defaultModeImg from 'assets/img/generic/falcon-mode-default.jpg';
import darkModeImg from 'assets/img/generic/falcon-mode-dark.jpg';
import invertedImg from 'assets/img/generic/inverted.png';
import cardImg from 'assets/img/generic/card.png';
import vibrantImg from 'assets/img/generic/vibrant.png';
import transparentImg from 'assets/img/generic/default.png';
import arrowsH from 'assets/img/icons/arrows-h.svg';
import paragraph from 'assets/img/icons/paragraph.svg';
import Flex from 'components/common/Flex';
import AppContext from 'context/Context';
import RadioItem from './RadioItem';
import SoftBadge from 'components/common/SoftBadge';

const SettingsPanel = () => {
  const {
    config: {
      isFluid,
      isRTL,
      isDark,
      navbarPosition,
      navbarStyle,
      showSettingPanel,
      disabledNavbarPosition
    },
    setConfig,
    configDispatch
  } = useContext(AppContext);

  const [navbars] = useState([
    {
      name: 'transparent',
      image: transparentImg
    },
    {
      name: 'inverted',
      image: invertedImg
    },
    {
      name: 'card',
      image: cardImg
    },
    {
      name: 'vibrant',
      image: vibrantImg
    }
  ]);

  return (
    <Offcanvas
      show={showSettingPanel}
      onHide={() => setConfig('showSettingPanel', false)}
      placement="end"
      style={{ maxWidth: '22rem' }}
      className="border-0"
    >
      <Offcanvas.Header
        closeButton
        closeVariant="white"
        className="bg-shape settings-panel-header"
      >
        <Offcanvas.Title as="div" className="py-1 z-index-1 light">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="text-white">
              <FontAwesomeIcon icon="palette" className="me-2 fs-0" />
              Configuração
            </h5>
            <Button
              variant="primary"
              size="sm"
              className="rounded-pill mt-0 mb-0"
              style={{ fontSize: '12px' }}
              onClick={() => {
                configDispatch({ type: 'RESET' });
              }}
            >
              <FontAwesomeIcon
                icon="redo-alt"
                style={{ fontSize: '10px' }}
                className="me-1"
              />
              Reset
            </Button>
          </div>
          <p className="mb-0 fs--1 text-white opacity-75">
          Defina seu próprio estilo personalizado
          </p>
        </Offcanvas.Title>
      </Offcanvas.Header>
      {/* <ScrollBarCustom> */}
      <Offcanvas.Body className="scrollbar">
        <h5 className="fs-0">Esquema de cores</h5>
        <p className="fs--1">Escolha o modo de cor perfeito para seu aplicativo.</p>

        <ButtonGroup className="btn-group-navbar-style">
          <RadioItem
            name="theme-mode"
            label="light"
            active={!isDark}
            onChange={({ target }) => setConfig('isDark', !target.checked)}
            image={defaultModeImg}
          />
          <RadioItem
            name="theme-mode"
            label="dark"
            active={isDark}
            onChange={({ target }) => setConfig('isDark', target.checked)}
            image={darkModeImg}
          />
        </ButtonGroup>

        <hr />

        <Flex justifyContent="between">
          <img src={arrowsH} alt="" width={20} className="me-2 h-100" />
          <div className="flex-1">
            <h5 className="fs-0">Layout fluido</h5>
            <p className="fs--1 mb-0">Alternar sistema de layout de contêiner</p>
          </div>
          <Form.Check
            type="switch"
            id="fluid-mode-switch"
            checked={isFluid}
            onChange={({ target }) => setConfig('isFluid', target.checked)}
          />
        </Flex>
        <hr />

        <Flex>
          <img src={paragraph} alt="" width={20} className="me-2 h-100" />
          <div>
            <Flex alignItems="center" tag="h5" className="fs-0">
            Posição de navegação
              <SoftBadge bg="success" pill className="fs--2 ms-2">
                Novo
              </SoftBadge>
            </Flex>
            <p className="fs--1 mb-2">
              Selecione um sistema de navegação adequado para sua aplicação web
            </p>
            <Form.Select
              className="mb-3"
              size="sm"
              defaultValue={navbarPosition}
              onChange={({ target }) =>
                setConfig('navbarPosition', target.value)
              }
            >
              {['vertical', 'top', 'combo', 'double-top'].map(option => (
                <option
                  key={option}
                  disabled={disabledNavbarPosition.includes(option)}
                  value={option}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </Form.Select>
          </div>
        </Flex>

        <hr />
        <h5 className="fs-0 d-flex align-items-center">
          Estilo da barra de navegação vertical{' '}
        </h5>
        <p className="fs--1">Alterne entre estilos para sua barra de navegação vertical</p>
        <ButtonGroup className="btn-group-navbar-style">
          {navbars.slice(0, 2).map(item => (
            <RadioItem
              key={item.name}
              name="navbar-style"
              label={item.name}
              active={navbarStyle === item.name}
              onChange={() => setConfig('navbarStyle', item.name)}
              image={item.image}
            />
          ))}
        </ButtonGroup>
        <ButtonGroup className="btn-group-navbar-style">
          {navbars.slice(2, 4).map(item => (
            <RadioItem
              key={item.name}
              name="navbar-style"
              label={item.name}
              active={navbarStyle === item.name}
              onChange={() => setConfig('navbarStyle', item.name)}
              image={item.image}
            />
          ))}
        </ButtonGroup>
        
      </Offcanvas.Body>
      {/* </ScrollBarCustom> */}
    </Offcanvas>
  );
};

export default SettingsPanel;

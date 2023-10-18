import React from 'react';
import { Card } from 'react-bootstrap';

const Error500 = () => (
  <Card className="text-center h-100">
    <Card.Body className="p-5">
      <div className="display-1 text-300 fs-error">500</div>
      <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
        Opa, algo deu errado!
      </p>
      <hr />
      <p>
        Tente atualizar a página ou voltar e tentar a ação novamente.
        Se esse problema persistir,
        <a href="mailto:info@exmaple.com" className="ms-1">
        Contate-nos
        </a>
        .
      </p>
    </Card.Body>
  </Card>
);

export default Error500;

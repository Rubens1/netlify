import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';
import AuthCardLayout from 'layouts/AuthCardLayout';

const ForgetPassword = () => {
  return (
    <AuthCardLayout>
      <h4 className="mb-0"> Esqueceu sua senha?</h4>
      <p className="mb-0">Digite seu e-mail e enviaremos um link de redefinição.</p>
      <ForgetPasswordForm layout="card" />
    </AuthCardLayout>
  );
};

export default ForgetPassword;

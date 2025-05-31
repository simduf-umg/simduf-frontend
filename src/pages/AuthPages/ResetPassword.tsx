import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordMessage from "../../components/auth/ResetPasswordMessage";

export default function ResetPassword() {
  return (
    <>
      <PageMeta
        title="SIMDUF | Restablecer Contraseña"
        description="Página de restablecimiento de contraseña para SIMDUF"
      />
      <AuthLayout>
        <ResetPasswordMessage />
      </AuthLayout>
    </>
  );
} 
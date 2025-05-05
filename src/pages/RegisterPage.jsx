import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '@/store/users/action';

function RegisterPage() {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-black">Selamat Datang 👋</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Daftarkan akun untuk melanjutkan
            </p>
          </header>

          <RegisterInput register={onRegister} />

          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

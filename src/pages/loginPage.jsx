import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../store/authUser/action';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <title>Login</title>
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-black">Selamat Datang 👋</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Login akun untuk melanjutkan
            </p>
          </header>

          <LoginInput login={onLogin} />

          <p className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

import { Button } from '@/components/ui/button/button';
import { PlusIcon } from 'lucide-react';
import { PostList } from './components/post/PostList';
import Header from './components/header/Header';
import NavBar from './components/header/Nav';
import TagBar from './components/header/Tag';
import MobileNavbar from './components/footer/mobileNavbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './pages/register';
import LoginForm from './pages/login';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './store/isPreload/action';
import Loading from './components/ui/loading';
// import Loading from './components/ui/Loading'; // Tambahkan sesuai asumsi

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 py-6">
        <aside className="hidden md:flex flex-col gap-6 h-[calc(100vh-80px)] sticky top-20">
          <NavBar />
          <TagBar />
        </aside>
        <main>{children}</main>
      </div>
      <MobileNavbar />
      <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg md:flex hidden items-center justify-center bg-purple-600 hover:bg-purple-700">
        <PlusIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

function ForYou() {
  return <PostList />;
}

function Following() {
  return <h1>Following Feed</h1>;
}

function Latest() {
  return <h1>Latest Posts</h1>;
}

function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirecting(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (redirecting) {
    return <Navigate to="/" />;
  }

  return <div>Page not found. Redirecting to login...</div>;
}

export default function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return <h1>loading</h1>;

  if (authUser === undefined || null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>
      </>
    );
  }
  return (
    <>
      <Loading />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <ForYou />
              </Layout>
            }
          />
          <Route
            path="/following"
            element={
              <Layout>
                <Following />
              </Layout>
            }
          />
          <Route
            path="/latest"
            element={
              <Layout>
                <Latest />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

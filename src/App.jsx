import { Button } from '@/components/ui/button/button';
import { PlusIcon } from 'lucide-react';
import { PostList } from './components/post/PostList';
import Header from './components/header/Header';
import NavBar from './components/header/Nav';
import TagBar from './components/header/Tag';
import MobileNavbar from './components/footer/mobileNavbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './pages/register';
import { Toaster } from './components/ui/sonner';
import PropTypes from 'prop-types';
import LoginForm from './pages/login';
import { useState, useEffect } from 'react';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <Header />
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 py-6">
        <aside className="hidden md:flex flex-col gap-6 h-[calc(100vh-80px)] sticky top-20">
          <NavBar />
          <TagBar />
        </aside>
        {children}
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

const isAuthenticated = () => {
  return localStorage.getItem('userToken') !== null;
};

function ForYou() {
  return (
    <div className="space-y-4">
      <PostList />
    </div>
  );
}

function Following() {
  return (
    <div className="space-y-4">
      <h1>Following Feed</h1>
    </div>
  );
}

function Latest() {
  return (
    <div className="space-y-4">
      <h1>Latest Posts</h1>
    </div>
  );
}

function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Start redirecting after 4 seconds
    const timer = setTimeout(() => {
      setRedirecting(true);
    }, 4000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (redirecting) {
    return <Navigate to="/login" />;
  }

  return <div>Page not found. Redirecting to login...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Layout>
                <ForYou />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/following"
          element={
            isAuthenticated() ? (
              <Layout>
                <Following />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/latest"
          element={
            isAuthenticated() ? (
              <Layout>
                <Latest />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

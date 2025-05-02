import { Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/register';
import LoginForm from './pages/login';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './store/isPreload/action';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Loading from './components/ui/loading';
import Leaderboard from './pages/Leaderboard';
import DetailPost from './pages/DetailPost';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
  console.log(authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {

    return <Loading />;
  }

  if (authUser === null) {
    return (
      <>
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
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Layout>
                <Leaderboard />
              </Layout>
            }
          />
          <Route
            path="/post/:id"
            element={
              <Layout>
                <DetailPost />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

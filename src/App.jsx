import { Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterPage';
import LoginForm from './pages/loginPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './store/isPreload/action';
import NotFound from './pages/NotFoundPage';
import Home from './pages/HomePage';
import Layout from './components/Layout';
import Loading from './components/ui/loading';
import Leaderboard from './pages/LeaderboardPage';
import DetailPost from './pages/DetailPage';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
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

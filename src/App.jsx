import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import Signup from './pages/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Recover from './pages/Recover/Recover';
import PasswordEdit from './pages/PasswordEdit/PasswordEdit';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Profil from './pages/Profil/Profil';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/password/edit" element={<PasswordEdit />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

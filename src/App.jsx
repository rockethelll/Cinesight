import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import Signup from './pages/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="movie/:id" element={<MovieDetails />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Créer un compte</Link>
    </nav>
  );
};

export default Navbar;
import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth, kv } = usePuterStore();
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      {auth.isAuthenticated ? (
        <div>
          <Link to="/upload" className="primary-button w-fit m-5">
            Upload resume
          </Link>
          <a onClick={auth.signOut} className="primary-button w-fit">
            Sign out
          </a>
        </div>
      ) : (
        <a onClick={auth.signIn} className="primary-button w-fit">
          Sign in
        </a>
      )}
    </nav>
  );
};

export default Navbar;

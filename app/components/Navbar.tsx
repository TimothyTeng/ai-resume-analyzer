import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <>
      <nav className="lp-navbar">
        <Link to="/" className="lp-logo">
          ResuBench
        </Link>

        <div className="lp-nav-actions">
          {auth.isAuthenticated ? (
            <>
              <Link to="/upload" className="lp-nav-btn lp-nav-btn-gold">
                <span className="lp-nav-slide" />
                <span className="lp-nav-label">Upload Resume</span>
              </Link>
              <button
                className="lp-nav-btn lp-nav-btn-ghost"
                onClick={auth.signOut}
              >
                <span className="lp-nav-slide" />
                <span className="lp-nav-label">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              className="lp-nav-btn lp-nav-btn-gold"
              onClick={auth.signIn}
            >
              <span className="lp-nav-slide" />
              <span className="lp-nav-label">Sign In</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { KeyIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Always visible links */}
        <div className="flex gap-4 items-center">
          <Link to="/">
            <button className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Home
            </button>
          </Link>

          <Link to="/about">
            <button className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
              About
            </button>
          </Link>
        </div>

        {/* Right side - Auth related */}
        <div className="flex gap-4 items-center">
          {isLoggedIn && (
            <>
              <span className="text-gray-700">
                Welcome, {user && user.name}
              </span>
              <button
                onClick={logOutUser}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 transition-colors"
                title="Logout"
              >
                <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link to="/login">
              <button
                className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                title="Login"
              >
                <KeyIcon className="w-6 h-6" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo width="70px" />
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              className="text-sm text-mist hover:text-chalk transition-colors duration-200"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-sm text-mist hover:text-chalk transition-colors duration-200"
              to="/all-posts"
            >
              Posts
            </Link>
          </nav>

          <p className="text-xs text-mist/60">
            &copy; {new Date().getFullYear()} ByteLog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

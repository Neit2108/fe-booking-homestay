// components/Navbar/NavLink.jsx
import { Link } from "react-router-dom";

function NavLink({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`relative font-medium transition-colors duration-200 pb-1 ${
        isActive ? "text-accent" : "text-primary hover:text-accent"
      }`}
    >
      {children}
      <span 
        className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full transition-transform duration-300 ${
          isActive ? "bg-accent scale-x-100" : "bg-accent scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

export default NavLink;
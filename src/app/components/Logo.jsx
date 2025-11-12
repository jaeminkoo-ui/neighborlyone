import { Link } from "react-router";
import logoImage from "../assets/logo.png";

export default function Logo({ className = "", linkTo = "/" }) {
  return (
    <Link to={linkTo} className="flex items-center gap-3 text-gray-900">
      <img 
        src={logoImage} 
        alt="NeighborlyOne Logo" 
        className={`h-8 w-auto ${className}`}
      />
    </Link>
  );
}

// Simplified version without Link (for places where Link is not needed)
export function LogoImage({ className = "" }) {
  return (
    <img 
      src={logoImage} 
      alt="NeighborlyOne Logo" 
      className={`h-8 w-auto ${className}`}
    />
  );
}


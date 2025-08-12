import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-light text-center py-3 mt-auto">
      <div className="container">
        <span className="text-muted">&copy; {new Date().getFullYear()} Furniture Rental. All rights reserved.</span>
      </div>
    </footer>
  );
}

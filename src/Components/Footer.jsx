import React from "react";

export default function Footer() {
  return (
    <footer className="posts border-top text-center pt-5 pb-3 bg-light">
      <p>Copyright © Blog {new Date().getFullYear()}</p>
    </footer>
  );
}

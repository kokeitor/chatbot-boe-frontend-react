import React from "react";

export function CopyRightFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#000000] text-white text-center py-4">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {currentYear} Boe ChatBot. All rights reserved.
        </p>
        <p className="text-xs">
          Made with ❤️ and 💪 |{" "}
          <a href="/privacy" className="text-blue-400">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-400">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

import React, { useEffect } from "react";

export default function LoadSpinner() {
  useEffect(() => {
    var spinner = function () {
      setTimeout(function () {
        if (document.getElementById("spinner").classList.contains("show")) {
          document.getElementById("spinner").classList.remove("show");
        }
      }, 1);
    };
    spinner();
  }, []);

  return (
    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-grow text-cyan" role="status"></div>
    </div>
  );
}

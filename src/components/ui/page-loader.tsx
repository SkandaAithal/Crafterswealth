import React from "react";

function PageLoader() {
  return (
    <div
      className="w-screen h-full min-h-[calc(100vh-100px)] grid place-content-center"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default PageLoader;

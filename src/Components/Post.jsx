import React from "react";

export default function Post({ title, description }) {
  return (
    <div>
      <h5 className="mb-1" style={{ fontSize: "1.5rem" }}>
        {title}
      </h5>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
}
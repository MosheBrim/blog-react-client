import React from "react";

export default function Comment({ name, data, createdAt }) {
  return (
    <div className="mb-1">
      <div>
        <p className="post-meta card-title">
          {name} - {createdAt}
        </p>
        <hr />

        <h5 className="mb-2 text-muted">{data}</h5>
      </div>
    </div>
  );
}

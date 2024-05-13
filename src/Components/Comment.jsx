import React from 'react'

export default function Comment({name, data, createdAt}) {
  return (
    <div className="mb-1">
      <div className="com ">
        <p className="post-meta card-title">{name} - {createdAt}</p>
        <hr className="my-4 " />

        <h4 className="card-subtitle mb-2 text-muted">{data}</h4>
      </div>
    </div>
  )
}

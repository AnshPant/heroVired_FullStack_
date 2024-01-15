 

import React from 'react';

const Program = ({ program, onClick }) => {
  const { id, name, date, imageurl } = program;
  

  return (
    <div
      className="w-full flex items-start p-2 border-b-2 border-gray-200 hover:bg-gray-200"
      onClick={onClick}
    >
      <div className="h-full m-2">
        <div className=" bg-purple-500 rounded-full w-24">
          <img src={imageurl} alt={name} />
        </div>
      </div>
      <div className="h-full flex flex-col items-start m-2">
        <div className="text-black">{name}</div>
        <div className="text-gray-500">ID: {id} Last Modified: {date}</div>
      </div>
    </div>
  );
};

export default Program;

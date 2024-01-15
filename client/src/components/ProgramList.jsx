 

import React from 'react';
import Program from "./Program";

const ProgramList = ({ fetchedData, handleProgramClick }) => {
  return (
    <div className="h-full flex flex-col items-center justify-start">
      <div>
        {fetchedData.map((program) => (
          <Program
            key={program.id}
            program={program}
            onClick={() => handleProgramClick(program )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramList;

import React from "react";

interface Props {
  border: string;
  color: string;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
   
  
}

const FilterButton: React.FC<Props> = ({ 
    border,
    color,
    height,
    onClick, 
    radius,
    width,
     

  }) => { 
  return (
    <button 
      onClick={onClick}
      
       
      style={{
        
         backgroundColor: color,
         border,
         borderRadius: radius,
         height,
         width,
  
       
      }}
    >
    </button>
  );
}

export default FilterButton;


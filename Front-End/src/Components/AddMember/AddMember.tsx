import React from "react";
import "../SearchBox/SearchBox.css";

interface Props {
  border: string;
  // backgroundColor:string;
  color: string;
  // addOptionPlaceholderValue:string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: any;
  textAlign: any;
  cursor: any;
  // fontColor: any;

}

const Button: React.FC<Props> = ({
  border,
  // backgroundColor,
  color,
  // addOptionPlaceholderValue,
  children,
  height,
  onClick,
  radius,
  width,
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  cursor,
  // fontColor,

}) => {
  return (
    <button  
      onClick={onClick}
      
      
      // placeholder={addOptionPlaceholderValue}

      style={{
        backgroundColor: color,
        cursor,
        //  color,
        border,
        borderRadius: radius,
        height,
        width,
        fontFamily,
        fontSize,
        fontWeight,
        textAlign,

      }}
    >
      <div className="add_member">
      {children}
      </div>
    </button>
  );
}

export default Button;
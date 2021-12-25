import React from "react";
import "./Checkbox.css"

function Checkbox() {

  return (
    <>
        <input style={{
          "height": "20px",
          "width": "19px",
          "border": "0.5px solid red",
          "borderRadius":"15px",
          "backgroundColor":"inherit",
          "boxShadow":   "inset -1px -1px 12px #9a9a9a61",
          "cursor": "default",
          "appearance": "auto",
          "boxSizing": "border-box"}}
          type="checkbox"
        />
          
      </>
  

  );
}

export default Checkbox;




















// import React from "react";

// interface Props {
//   isChecked: boolean;
//   border?:string;
//   height:string;
//   width:string;
//   radius:string;
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   label: string;
// }

// const Checkbox = (props: Props) => {
//   return (
//     <div>
//       <label htmlFor={props.label}>{props.label}</label>
//       <input
//         type="checkbox"
//         checked={props.isChecked}
//         onChange={props.handleChange}

//       />
//     </div>
//   );
// };
// export default Checkbox;




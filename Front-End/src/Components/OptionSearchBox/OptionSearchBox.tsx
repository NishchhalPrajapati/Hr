import { FunctionComponent } from "react";
import "../SearchBox/SearchBox.css";
import { useForm } from "react-hook-form";
type props = {
  searchOptionBorderRadiusValue: string;
  searchOptionWidthValue: string;
  searchOptionHeightValue: string;
  searchOptionPlaceholderValue: string;
  searchOptionListValue: string;
  searchOptionBorderOrNot: string;
  searchOptionBoxPaddingLeft: string;
  searchboxShadowValue?: string;
  searchOptionLeft?:string;
  valueText?:any;
  // searchOptionposition?:string;
  Errors?:any;
  searchOptions: any;
  fontFamily: string;
  fontSize: string;
  color:string;
  // searchColor: any
  optionName?:any
  register?:any
  
  // BoxColor: any;
  // searchColor:any;
};
const OptionSearchBox: FunctionComponent<props> = ({
  searchOptionBorderRadiusValue,
  searchOptionWidthValue,
  searchOptionHeightValue,
  searchOptionPlaceholderValue,
  searchOptionListValue,
  searchOptionBorderOrNot,
  searchOptionBoxPaddingLeft,
  searchboxShadowValue,
  searchOptionLeft,
  // searchOptionposition,
  valueText,
  Errors,
  searchOptions,
  fontFamily,
  fontSize,
  color,
  optionName,
  // searchColor,
  register
   
  // BoxColor,
 
  // searchColor,
}) => {
  return (
    <>
      <input
        className="optionsearchBox"
        list={searchOptionListValue}
        type="text"
        placeholder={searchOptionPlaceholderValue }
        style={{
          backgroundColor : color,
          left: `${searchOptionLeft}`,
          borderRadius: ` ${searchOptionBorderRadiusValue}`,
          boxShadow: `${searchboxShadowValue}`,
          width: `${searchOptionWidthValue}`,
          height: `${searchOptionHeightValue}`,
          border: `${searchOptionBorderOrNot}`,
          paddingLeft: `${searchOptionBoxPaddingLeft}`,
          fontFamily: `${fontFamily}`,
          fontSize: `${fontSize}`,
          // color: `${searchColor}`,
      
          // color: `${BoxColor}`,
      
          // color: `${searchColor}`
        }}
       
      />
      <datalist id={searchOptionListValue}>
        {searchOptions.map((Optionsvalue: any, key: number) => (
          <option key={key} value={Optionsvalue} />
        ))}
      </datalist>
    </>
  );
};

export default OptionSearchBox;

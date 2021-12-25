import { FunctionComponent } from "react";
import "./SearchBox.css";
type props = {
  searchBorderRadiusValue: string;
  searchWidthValue: string;
  searchHeightValue: string;
  searchPlaceholderValue: string;
  searchTypeValue: string;
  searchBorderOrNot: string;
  searchBoxPaddingLeft: string;
  
};
const SearchBox: FunctionComponent<props> = ({
  searchBorderRadiusValue,
  searchWidthValue,
  searchHeightValue,
  searchPlaceholderValue,
  searchTypeValue,
  searchBorderOrNot,
  searchBoxPaddingLeft,
  
}) => {
  return (
    <>
      <input
        className="searchBox"
        type={searchTypeValue}
        placeholder={searchPlaceholderValue}
        style={{
          borderRadius: ` ${searchBorderRadiusValue}`,
          width: `${searchWidthValue}`,
          height: `${searchHeightValue}`,
          border: `${searchBorderOrNot}`,
          paddingLeft: `${searchBoxPaddingLeft}`,
        }}
      />
    </>
  );
};

export default SearchBox;

import React, { FunctionComponent } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
type props = {
  title?: string;
  option?: any[];
  setDetails?: () => void;
  setSelectedValue: (val: any) => void;
  selectedValue?: any;
  disable?: boolean;
  choices?: any[];
  isMulti?: boolean;
  style?: any;
};
const animatedComponents = makeAnimated();
const Dropdown: FunctionComponent<props> = ({
  title,
  option,
  setDetails,
  selectedValue,
  setSelectedValue,
  disable,
  choices,
  isMulti,
  style,
}) => {
  const choice = () => {
    if (option) {
      let data = option.map((item: any, index: number) =>
        item === "Team Lead"
          ? {
              value: item,
              label: "Team Leader",
            }
          : { value: item, label: item }
      );
      if (title) {
        data.push({ label: title, value: title });
        return data;
      } else {
        return data;
      }
    } else {
      return choices ? choices : [];
    }
  };

  return (
    <>
      <Select
        menuPlacement="auto"
        maxMenuHeight={150}
        options={choice()}
        value={selectedValue}
        components={animatedComponents}
        onChange={(data: { label: string | undefined; }) => {
          if (data?.label === title) {
            if (setDetails) setDetails();
          }

          setSelectedValue(data);
        }}
        // showCheckbox={true}
        isSearchable={true}
        isDisabled={disable ? true : choice().length === 0 ? true : false}
        isMulti={isMulti}
        // style={style}
      />
    </>
  );
};

export default Dropdown;

import { FunctionComponent } from "react";
import "./Card.css";

type props = {
  valueHeight: string;
  valueWidth: string;
  valueBoxShadow: string;
  valueBoxRadius?: string;
  children: React.ReactNode;
};
const Card: FunctionComponent<props> = ({
  valueHeight,
  valueWidth,
  valueBoxShadow,
  valueBoxRadius,
  children,
}) => {
  return (
    <>
      <div
        style={{
          width: valueWidth,
          minHeight: valueHeight,
          boxShadow: valueBoxShadow,
          borderRadius: valueBoxRadius,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Card;

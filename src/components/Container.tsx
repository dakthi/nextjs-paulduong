  import React from "react";

  interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }

  export function Container(props: Readonly<ContainerProps>) {
    return (
      <div
        className={`container mx-auto xl:px-0 bg-white ${
          props.className ? props.className : ""
        }`}>
        {props.children}
      </div>
    );
  }


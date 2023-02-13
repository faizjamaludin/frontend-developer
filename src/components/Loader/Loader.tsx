import React from "react";
import { MutatingDots } from "react-loader-spinner";

type LoaderProp = {};

function Loader(props: LoaderProp) {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#000000"
      secondaryColor="#000000"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default Loader;

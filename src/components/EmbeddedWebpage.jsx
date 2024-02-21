import { Html } from "@react-three/drei";
import React, { useRef } from "react";

const EmbeddedWebpage = ({ url, width, height, children, ...props }) => {
  const htmlRef = useRef();

  return (
    <Html center {...props} transform occlude="blending" >
      <iframe
        title="Embedded Webpage"
        src={url}
        width={width}
        height={height}
        allowFullScreen
        ref={htmlRef}
      />
    </Html>
  );
};

export default EmbeddedWebpage;

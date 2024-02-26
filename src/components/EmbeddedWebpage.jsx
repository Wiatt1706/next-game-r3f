import { Html } from "@react-three/drei";

const EmbeddedWebpage = ({ url, width, height, show = true, ...props }) => {


  return (
    <Html center {...props} transform>
        <iframe
          title="Embedded Webpage"
          src={url}
          width={width}
          height={height}
          allowFullScreen
        />
    </Html>
  );
};

export default EmbeddedWebpage;

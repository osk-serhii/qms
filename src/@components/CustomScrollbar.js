import { Scrollbar } from "smooth-scrollbar-react";

interface CProps {
  children: React.ReactNode;
}

const CustomScrollbar: React.FC<CProps> = (props) => {
  return (
    <Scrollbar
      alwaysShowTracks
      plugins={{
        overscroll: {
          effect: "glow",
        },
      }}
      className="custom-scrollbar"
    >
      {props.children}
    </Scrollbar>
  );
}

export default CustomScrollbar;
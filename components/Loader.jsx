import { GiMeeple } from "react-icons/gi";

export default function Loader({size}) {
  return (
    <div className="">
      <GiMeeple size={size} color="#7bc242"/>
      <GiMeeple size={size} color="#b8373c"/>
      <GiMeeple size={size} color="#feca28"/>
      <GiMeeple size={size} color="#517abc"/>
    </div>
  );
}

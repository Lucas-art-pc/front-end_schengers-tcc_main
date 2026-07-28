

export const AreaTag = ({ area }) => {
  return (
    <span className={`text-[10px] text-white font-semibold px-2.5 py-0.5 rounded-full tracking-wide `}
     style={{ backgroundColor: area.color_area }}>
      {area.name_area}
    </span>
  );
};
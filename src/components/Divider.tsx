interface dividerProps {
  marginTop: string;
  marginBottom: string;
}

const Divider = ({ marginBottom, marginTop }: dividerProps) => {
  return (
    <div
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
        width: "100%",
        height: "1px",
        backgroundColor: "#282828",
      }}
    ></div>
  );
};

export default Divider;

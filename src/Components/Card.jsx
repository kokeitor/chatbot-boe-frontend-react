export function Card(props) {
  return (
    <>
      <div className="text-white font-mono text-xs max-w-max bg-[#7eb481] items-center p-2 rounded-lg">
        <div className="inline-block">
          <h1 className="font-semibold text-center">
            {props.title ? props.title : ""}
          </h1>
          <p className="text-center hover:font-bold">
            {props.text ? props.text : ""}
          </p>
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
          >
        <props.icon
            size={30}
            color={props.iconColor}
            className="mt-3 mx-auto hover:scale-125 transition transform duration-200"
          />
          </a>
        </div>
      </div>
    </>
  );
}

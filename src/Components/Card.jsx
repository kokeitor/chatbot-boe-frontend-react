export function Card(props) {
  return (
    <>
      <div className="text-white font-mono text-xs max-w-max bg-[#acacac] items-center p-2 rounded-lg">
        <div className="inline-block px-1 py-1">
          <h1 className="font-semibold text-sm text-center mt-1 mb-4">
            {props.title ? props.title : ""}
          </h1>
          <p className="text-center hover:font-bold">
            {props.text ? props.text : ""}
          </p>
          <a href={props.href} target="_blank" rel="noopener noreferrer">
            {props.icon ? (
              <props.icon
                size={35}
                color={props.iconColor}
                className="mt-4 mb-2 mx-auto my-2 hover:scale-125 transition transform duration-200"
              />
            ) : (
              <img
                src={props.src}
                className="mt-4 mb-2 my-2 mx-auto hover:scale-110 transition transform duration-200"
              />
            )}
          </a>
        </div>
      </div>
    </>
  );
}

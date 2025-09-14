export function BaseEmbed({
  type,
  link,
}: {
  type: "notion" | "youtube" | "x";
  link: string;
}) {
  const getIframe = (type: "notion" | "youtube" | "x", link: string) => {
    if (type === "youtube") {
      return (
        <iframe
          width="100%"
          height="95%"
          src={link}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //   referrerpolicy="strict-origin-when-cross-origin"
          //   allowfullscreen
        ></iframe>
      );
    }

    if (type === "notion") {
      return (
        <iframe
          width="100%"
          height="100%"
          src={
            "https://docs.google.com/document/d/1VjoCEuZTpXIw0JmP81rcfPSxcCuz2ax7lTD1hW1Nooc/preview"
          }
          title="Notion Embed"
          frameBorder="0"
        />
      );
    }

    if (type === "x") {
      return (
        <blockquote className="twitter-tweet">
          <a href={link}></a>
        </blockquote>
      );
    }

    return null;
  };

  return (
    <div
      className="absolute bg-gray-50"
      style={{
        top: "300px",
        left: "500px",
        width: "300px",
        height: "200px",
      }}
    >
      {getIframe(type, link)}
    </div>
  );
}

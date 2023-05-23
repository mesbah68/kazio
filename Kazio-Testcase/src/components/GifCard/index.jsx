export default function GifCard({title, url, username}) {
  return (
    <div className="bg-base-300 w-96 text-center rounded-2xl m-4">
      <div className="flex justify-between px-3 pb-2 pt-4">
        <h3>{title}</h3>
        <h5>{username}</h5>
      </div>
      <img
        className="object-cover h-48 w-96 p-2 rounded-2xl"
        alt={title}
        src={url}
      />
    </div>
  );
}

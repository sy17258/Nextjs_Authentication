export default function UserProfile({ params } ) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl">Profile page</p>
      <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
        {params.id}
      </span>
    </div>
  );
}

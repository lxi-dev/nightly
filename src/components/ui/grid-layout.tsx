export default function GridLayout() {
  return (
    <div className="grid grid-cols-1 gap-4 h-screen p-4 bg-black text-white md:grid-cols-2 md:grid-rows-3">
      {/* Top-left: User profile */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md md:col-span-1">
        <h1 className="text-lg font-bold">hey Andre Salmeri,</h1>
        <p>nice to see you again!</p>
        <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md">
          lets go!
        </button>
      </div>

      {/* Middle-left: Happenings */}
      <div className="bg-gray-900 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold">Happenings</h2>
        <p className="text-sm mt-2">
          Create another Memory. Either Placebound, Private, or Public. Invite
          people to your happening and manage helping hands! Chat about whatever
          is important with all attendees.
        </p>
      </div>

      {/* Top-right: Feed */}
      <div className="bg-gray-900 p-4 rounded-2xl shadow-md md:row-span-2">
        <h2 className="text-lg font-bold">Feed</h2>
      </div>

      {/* Bottom-left: Place verwalten */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold">Place verwalten</h2>
      </div>

      {/* Bottom-right: Freunde hinzufügen */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold">Freunde hinzufügen</h2>
      </div>
    </div>
  );
}
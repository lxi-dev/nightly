import { api } from "nglty/trpc/react";
import React from "react";

const DeleteButton = ({ userId }: {userId?: string}) => {
  // Use tRPC mutation instead of React Query
  const { mutate: deleteUser } = api.user.deleteUserAsAdmin.useMutation({
    onSuccess: () => {
      console.log('delete successful');
    },
    onError: (error) => {
      console.error(error.message || "An error occurred while deleting.");
    },
  });

  const { mutate: deleteMyself } = api.user.deleteOwnUser.useMutation();

  const handleClick = () => {
    const confirmationMessage = userId
      ? "Are you sure you want to delete this user?"
      : "Are you sure you want to delete your account? This action is irreversible.";

    if (window.confirm(confirmationMessage)) {
        if(userId) {
            deleteUser({ id: userId });
        } else {
            deleteMyself();
        }
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
      onClick={handleClick}
    >
      {userId ? "Delete User" : "Delete My Account"}
    </button>
  );
};

export default DeleteButton;
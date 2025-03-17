'use client';
import { api } from "nglty/trpc/react";
import { UserListItem } from "./user";

// type usersData = {
//     image: string | null;
//     id: string;
//     name: string | null;
//     handle: string | null;
//     location: string | null;
// }


export const UsersList = () => {
    const { data: users, isLoading, isError } = api.user.getAllUsers.useQuery();

    if (isLoading) {
        return <div>Loading users...</div>;
    }

    if (isError) {
        return <div>Failed to load users.</div>;
    }
    return(
        <main>
            { users?.map((user)  => 
                    {
                    return <UserListItem user={user}/>

                        })
                    }
        </main>
    )

}
import { UserProfileIcon } from "../elements/user-icon"

type UserProp = {
    handle: string | null,
    name: string | null,
    location: string | null,
    image: string | null
}
export const UserListItem = ({user} : {user: UserProp}) => {
    return (
        <div className="h-12 w-full mb-2 flex p-1 flex-row">
            <UserProfileIcon src={user.image}/>
            <div className="flex flex-col pl-4">
            <p>{user.handle ?? user.name}</p>
            <small className="text-slate-600">{user.location}</small>
            </div>
        </div>
    )
}
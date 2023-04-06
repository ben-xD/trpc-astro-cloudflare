interface User {
  id: string;
  name: string;
  bio?: string;
}

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong> (id: {user.id})
            </div>
            <div>{user.bio}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

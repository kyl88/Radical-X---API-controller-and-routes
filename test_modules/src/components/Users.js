import React, {useState, useEffect} from "react";

function Users(){
 const [users, setUsers] = useState([]);

  useEffect(() => {
     fetch ("/users/").then(res => {
         if (res.ok){
              return res.json()

            }

        }).then(jsonRes => setUsers(jsonRes.teamTypes))

    })  

  return (
      users.map(user => <li>user</li>)

    )


}

export default Users;


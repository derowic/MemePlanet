import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Button from "../BasicElements/Button";
import SearchUser from "./SearchUser";
import FetchIndex from "../API/FetchIndex";

export default function RoleAndPermissions() {
    const user = usePage().props.auth.user;
    const translation = useTranslation(["dashboard"]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [admins, setAdmins] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setAdmins(await FetchIndex("adminPanel.getAdmins"));
            setModerators(await FetchIndex("adminPanel.getModerators"));
            setBannedUsers(await FetchIndex("adminPanel.getBannedUsers"));

            setRoles(await FetchIndex("role.index"));
            setPermissions(await FetchIndex("permission.index"));
            //setUsers(await FetchIndex("adminPanel.getAllUsers"));

            // Tutaj możesz kontynuować inne operacje po pobraniu danych
        };

        fetchData(); // Wywołujemy funkcję fetchData
    }, []);


    const togglePermission = (permissionId) => {
        if (selectedPermissions.includes(permissionId)) {
            setSelectedPermissions(
                selectedPermissions.filter((id) => id !== permissionId),
            );
        } else {
            setSelectedPermissions([...selectedPermissions, permissionId]);
        }
    };

    const assignPermissions = () => {
        if (selectedUser.id === null || selectedPermissions.length === 0) {
            return;
        }
        const data = {
            user_id: selectedUser.id,
            permission_ids: selectedPermissions,
        };

        axios.post("/api/assign-permissions", data).then((response) => {
            toast.success(response.data.msg);
        });
        refreshUser(selectedUser.id);
    };

    const toggleRole = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };

    const assignRoles = () => {
        if (selectedUser.id === null || selectedRoles.length === 0) {
            return;
        }
        const data = {
            user_id: selectedUser.id,
            role_ids: selectedRoles,
        };
        axios.post(route("role.assignRoles"), data).then((response) => {
            toast.success(response.data.msg);
        });
        refreshUser(selectedUser.id);
    };

    const refreshUser = async (userId) => {
        const tmp = await FetchIndex("adminPanel.searchById", {
            id: userId,
        });
        console.log(tmp);
        setSelectedUser(tmp);
    };
    //console.log(selectedUser);
    return (
        <AuthenticatedLayout>
            <div className="font-bold bg-[#231f20] text-white justify-center items-center ">
                <div className="text-center">
                    <h1>Wybierz Uprawnienia i Przypisz do Użytkownika</h1>
                    <div className=" border-b-2 ">
                        <div className="text-black">
                            <SearchUser setSelectedUser={setSelectedUser} />
                        </div>

                        <h2>Użytkownik: {selectedUser && selectedUser.name}</h2>
                        {/*<select
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="text-black"
                        >
                            <option value="">Wybierz użytkownika</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                            */}

                        <div className="w-full flex">

                                <div className="w-1/2 ">
                                    <div className="text-2xl">
                                        Permissions:{" "}
                                    </div>
                                    {selectedUser && selectedUser.permissions.map((permi) => (
                                            <div>{permi.name}</div>
                                        ))}
                                </div>
                                <div className="w-1/2 ">
                                    <div className="text-2xl">
                                        Role:{" "}
                                    </div>
                                    {selectedUser && selectedUser.roles.map((role) => (
                                            <div>{role.name}</div>
                                        ))}
                                </div>


                        </div>
                    </div>
                </div>
                <div className="flex  text-white justify-center items-center">
                    <div className="w-1/2  text-white justify-center items-center">
                        <h2>Uprawnienia</h2>
                        <ul>
                            {permissions.map((permission) => (
                                <li key={permission.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={permission.id}
                                            checked={selectedPermissions.includes(
                                                permission.id,
                                            )}
                                            onChange={() =>
                                                togglePermission(permission.id)
                                            }
                                        />
                                        {permission.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <Button
                            text={"Przypisz Uprawnienia"}
                            onClick={assignPermissions}
                            className
                        />
                    </div>
                    <div className="w-1/2 text-white text-center justify-center items-center">
                        <h2>Rola</h2>
                        <ul>
                            {roles.map((role) => (
                                <li key={role.id} className="text-left w-1/2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={role.id}
                                            checked={selectedRoles.includes(
                                                role.id,
                                            )}
                                            onChange={() => toggleRole(role.id)}
                                        />
                                        {role.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <Button
                            text={"Przypisz Role"}
                            onClick={assignRoles}
                            className
                        />
                    </div>
                </div>
                <div className="flex w-full text-center border-t-2 mt-5 text-2xl">
                    <div className="w-1/3">
                        Admins

                        {admins && admins.map((admin) => (
                             <div key={admin.id} className="text-base">{admin.name}</div>
                        ))}
                    </div>

                    <div className="w-1/3">
                        Moderators
                        {moderators.map((moderator) => (
                            <div key={moderator.id} className="text-base">{moderator.name}</div>
                        ))}
                    </div>
                    <div className="w-1/3">
                        Banned Users
                        {bannedUsers.map((bannedUser) => (
                            <div key={bannedUser.id} className="text-base">{bannedUser.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

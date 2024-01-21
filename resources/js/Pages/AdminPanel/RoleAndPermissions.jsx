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
import DefaultButton from "../BasicElements/DefaultButton";
import SearchUser from "./SearchUser";
import AxiosGet from "../API/AxiosGet";
import AxiosPost from "../API/AxiosPost";
import EditCategoriesAndTags from "./EditCategoriesAndTags";

export default function RoleAndPermissions() {
    const user = usePage().props.auth.user;
    const translation = useTranslation(["rolesAndPermissions"]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState(null);
    const [permissions, setPermissions] = useState([]);

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [admins, setAdmins] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);
    useEffect(() => {
        AxiosGet("user.getAdmins", null, null, setAdmins);
        AxiosGet("user.getModerators", null, null, setModerators);
        AxiosGet("user.getBannedUsers", null, null, setBannedUsers);
        AxiosGet("role.index", null, null, setRoles);
        AxiosGet("permission.index", null, null, setPermissions);
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
        /*if (selectedUser.id === null || selectedPermissions.length === 0) {
            return;
        }
        */
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
        if (selectedUser == null || selectedUser.id == null || selectedRoles.length === 0) {
            return null;
        }
        else
        {
            const data = {
                user_id: selectedUser.id,
                role_ids: selectedRoles,
            };
            // axios.post(route("role.assignRoles"), data).then((response) => {
            //     toast.success(response.data.msg);
            // });
            //AxiosPut("tag.improveTag", { tag: tag.id }, null);
            AxiosPost("role.assignRoles", data, null);
            refreshUser(selectedUser.id);
        }
    };

    const refreshUser = async (userId) => {
        AxiosGet("user.searchById", { id: userId }, null, setSelectedUser);
    };

    const removeBannedUser = (bannedUser) => {
        setBannedUsers((prevBannedUsers) =>
            prevBannedUsers.filter((user) => user !== bannedUser),
        );
    };

    const unBan = async (user) => {
        AxiosPost("ban.unBan", { user: user.id }, null);
        removeBannedUser(user);
    };
    //
    useEffect(() => {
        if(selectedUser)
        {
            const roleIds = selectedUser.roles.map(role => role.id);
            setSelectedRoles(roleIds);
        }
    }, [selectedUser]);


    return (
        <AuthenticatedLayout>
            <div className="flex">
                <div className="p-2 font-bold bg-meme_black text-white justify-center items-center w-1/2 ">
                    <div className="text-center">
                        <h1>{translation.t("Chose permissions and roles")}</h1>
                        <div className=" border-b-2 ">
                            <div className="text-black">
                                <SearchUser
                                    setSelectedUser={setSelectedUser}
                                    translation={translation}
                                />
                            </div>

                            <h2 className="mt-5">
                                {translation.t("Użytkownik")}:{" "}
                                {selectedUser && selectedUser.name}
                            </h2>
                            <div className="w-full flex">
                                {/* <div className="w-1/2 ">
                                    <div className="text-2xl">
                                        {translation.t("Permissions")}:
                                    </div>
                                    {selectedUser &&
                                        selectedUser.permissions.map(
                                            (permi) => <div>{permi.name}</div>,
                                        )}
                                </div> */}
                                {/* <div className="w-full">
                                    <div className="">
                                        {translation.t("Role")}:{" "}
                                    </div>
                                    {selectedUser &&
                                        selectedUser.roles.map((role) => (
                                            <div>{role.name}</div>
                                        ))}
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex  text-white justify-center items-center">
                        {/* <div className="w-1/2  text-white justify-center items-center">
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
                                                    togglePermission(
                                                        permission.id,
                                                    )
                                                }
                                            />
                                            {translation.t(permission.name)}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <DefaultButton
                                text={translation.t("Assign permission")}
                                onClick={assignPermissions}
                                className={
                                    "p-3 rounded-lg border border-green-500  hover:bg-green-400 m-2"
                                }
                            />
                        </div> */}
                        <div className="w-1/2 text-white text-center justify-center items-center">
                            <ul className="flex mt-2">
                                {roles.map((role) => (
                                    <li
                                        key={role.id}
                                        className="text-left mr-4"
                                    >
                                        <div className="flex">
                                            <input
                                                type="checkbox"
                                                value={role.id}
                                                checked={selectedRoles && selectedRoles.includes(
                                                    role.id,
                                                )}
                                                onChange={() =>
                                                    toggleRole(role.id)
                                                }
                                                className="p-2"
                                                checked={selectedRoles && selectedRoles.includes(role.id)}
                                            />
                                            <div className="ml-2"> {translation.t(role.name)}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <DefaultButton
                                text={translation.t("Assign role")}
                                onClick={assignRoles}
                                className={
                                    "p-3 rounded-lg border border-green-500  hover:bg-green-400 m-2"
                                }
                            />
                        </div>
                    </div>
                    <div className="flex w-full text-center border-t-2 mt-5 text-2xl">
                        <div className="w-1/3">
                            {translation.t("Admins")}
                            {admins &&
                                admins.map((admin) => (
                                    <div key={admin.id} className="text-base">
                                        {admin.name}
                                    </div>
                                ))}
                        </div>

                        <div className="w-1/3">
                            {translation.t("Moderators")}
                            {moderators.map((moderator) => (
                                <div key={moderator.id} className="text-base">
                                    {moderator.name}
                                </div>
                            ))}
                        </div>
                        <div className="w-1/3">
                            {translation.t("Banned Users")}
                            {bannedUsers.map((bannedUser) => (
                                <div className="flex text-base justify-between">
                                    <div
                                        key={bannedUser.id}
                                        className="text-base h-full p-3 m-2 items-center justify-center"
                                    >
                                        {bannedUser.name}
                                    </div>
                                    <DefaultButton
                                        text={translation.t("Unban user")}
                                        onClick={() => unBan(bannedUser)}
                                        className={
                                            "p-3 rounded-lg border border-yellow-500  hover:bg-yellow-400 m-2"
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 px-2">
                    <EditCategoriesAndTags translation={translation} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

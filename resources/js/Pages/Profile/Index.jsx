import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Index({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user} className="bg-[#231f20]">
            <Head title="Profile" />

            <div className="py-12 bg-[#231f20] text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-[#231f20] dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-[#231f20] dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl " />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

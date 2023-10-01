import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function MemeGenerator({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className=""></h2>}>
            <div className="text-white">Meme generaotor</div>
        </AuthenticatedLayout>
    );
}

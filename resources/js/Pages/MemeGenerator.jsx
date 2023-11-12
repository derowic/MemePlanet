import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Index from "./providerTest/Index";
export default function MemeGenerator({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="text-white">Meme generaotor</div>
            <div className="text-white">
                <Index />
            </div>
        </AuthenticatedLayout>
    );
}

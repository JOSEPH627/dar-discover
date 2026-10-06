import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/user/sign-in");
  }

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (user.role === "PROVIDER") {
    redirect("/provider/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f7f8f6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}
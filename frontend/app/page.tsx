"use client"
import { AuthState } from "@/store/authSlice";
import { UserInfo } from "@/types/auth.type";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user: UserInfo | undefined = useSelector((state: AuthState) => state.userInfo);
  useEffect(() => {
    if (user) {
      router.push(user.role.code === 'ADMIN' ? "/administrator" : "/user");
    } else {
      router.push("/login");
    }
  }, [user, router]);
  return null;
}

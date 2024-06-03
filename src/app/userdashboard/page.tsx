// src/app/user/dashboard/page.tsx
"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserDashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}!</p>
      {/* Puedes agregar más contenido específico del usuario aquí */}
    </div>
  );
};

export default UserDashboard;

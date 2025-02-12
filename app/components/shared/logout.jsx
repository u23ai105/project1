import { useRouter } from 'next/router';
// import Bn from '../../components/ui/button'

export default function LogoutButton() {
//   const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    // router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 rounded-2xl border-1  border-black  px-6 py-3 font-semibold uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
      Logout
    </button>
  );
}
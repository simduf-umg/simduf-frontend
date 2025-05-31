import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      closeDropdown();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const userRoles = user?.roles?.map(role => role.nombre_rol).join(', ') || '';
  const fullName = user ? `${user.persona.nombre} ${user.persona.apellido}` : '';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user?.username || ''}</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {fullName}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.correo || ''}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            Roles: {userRoles}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg
                className="w-5 h-5 stroke-gray-700 dark:stroke-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.90625 20.2491C3.82834 18.6531 5.15334 17.3278 6.74914 16.4055C8.34494 15.4831 10.1559 15 12.0001 15C13.8443 15 15.6553 15.4831 17.2511 16.4055C18.8469 17.3278 20.1719 18.6531 21.094 20.2491"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Mi Perfil
            </DropdownItem>
          </li>
        </ul>

        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-white/5"
            >
              <svg
                className="w-5 h-5 stroke-red-600 dark:stroke-red-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.78792 20.6649C8.50769 20.2671 7.21167 19.5717 6.06967 18.7973C4.87707 17.9873 3.21692 16.4322 2.21342 15.1614C1.50484 14.2516 1.00079 13.1832 1 12.0758C0.999209 10.9684 1.50484 9.9 2.21342 8.99024C3.21692 7.71936 4.87707 6.16432 6.06967 5.35432C7.21167 4.57992 8.50769 3.88448 9.78792 3.4867C10.2401 3.33216 10.8346 3.16461 11.3156 3.15281C13.3831 3.10216 14.9264 4.67466 15 6.52661"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22.9999 12H8.99992M22.9999 12L19.7439 8.5M22.9999 12L19.7439 15.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

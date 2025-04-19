import { createContext, useContext, useState } from "react";

// Creamos el contexto
export const UserContext = createContext();

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Por ahora parte como `true` según el hito

  const logout = () => setToken(false);     // Método para cerrar sesión

  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

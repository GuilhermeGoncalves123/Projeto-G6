// Importa funcoes do react necessarias para criar e usar o context
import { createContext, useState, useContext, children } from "react";
import secureLocalStorage from "react-secure-storage";

// criar o context de autenticacao, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

// Esse componente vai envolver a aplicacao (ou parte dela) e fornecer os dados de autenticacao para os filhos
// Provider = prover/dar
export const AuthProvider = ({children}) => {
    // cria um estado que guarda os dados do usuario logado
    const[usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    })

    return(
        // o authContext.Provider permite que qualquer componente dentro dele acesse o `usuario` e  `setUsuario`
        // Faz com que qualquer componente que esteja dentro e <AuthProvider> consiga acessar o valor { usuario, setaUsuario} usando o hook useAuth().
        <AuthContext.Provider value={{usuario, setUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

//esse hooks personalizado facilita o acesso ao contexto dentro de qualquer componente
// USAR!!
export const useAuth = () => useContext(AuthContext);

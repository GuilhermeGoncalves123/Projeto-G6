import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";
import Cadastro from "../../components/cadastro/Cadastro";
import banner_cadastroUsuario from "../../assets/img/cadastrousuario.png"

import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import api from "../../Services/services";


const TipoUsuarios = () => {

    const [tipoUsuario, setTipoUsuario] = useState("");
    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        })
    }


    async function cadastrarTipoUsuario(e) {
        e.preventDefault();

        if (tipoUsuario.trim() !== "") {
            try {
                await api.post("TiposUsuarios", { tituloTipoUsuario: tipoUsuario });
                alertar("success", "Cadastro realizado com sucesso!");
                setTipoUsuario("");

            } catch (error) {
                alertar("error", "Entre em contato com o suporte.");

            }
        } else {
            alertar("error", "O campo precisa estar preenchido!")
        }
    }



    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("TiposUsuarios");
            setListaTipoUsuario(resposta.data);
        } catch (error) {
            alertar("error", "Entre em contato com o suporte.");
        }
    }


    async function deletarTipoUsuario(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            iconColor: "#610315",
            showCancelButton: true,
            confirmButtonColor: '#610315',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`tiposUsuarios/${id.idTipoUsuario}`);
                alertar("success", "TipoUsuario Excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        })
    }

    async function editarTipoUsuario(tiposUsuarios) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu Tipo Usuario",
            input: "text",
            confirmButtonColor: '#610315',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Tipo Usuario",
            inputValue: tiposUsuarios.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoTipoUsuario) {
            try {
                await api.put(`tiposUsuarios/${tiposUsuarios.idTipoUsuario}`,
                    { tituloTipoUsuario: novoTipoUsuario });
                alertar("success", "Tipo Evento Modificado!")
            } catch (error) {

            }
            Swal.fire(`Seu novo Tipo Evento: ${novoTipoUsuario}`);
        }
    }



    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])


    return (
        <>
            <Header 
            nomeusu ="Administrador"/>

            <Cadastro
                img_banner={banner_cadastroUsuario}
                titulo_cadastro="Cadastro Tipo de Usuario"
                nomes="Titulo"
                visible="none"
                funcCadastro={cadastrarTipoUsuario}
                valorInput={tipoUsuario}
                setValorInput={setTipoUsuario}
                data="none" />

            <Lista
                titulo_lista="Tipo Usuario"
                titulo="Titulo"
                visibilidade="none"

                tipoLista="TiposUsuarios"
                lista={listaTipoUsuario}
                funcExcluir={deletarTipoUsuario}
                funcEditar={editarTipoUsuario}


            />


            <Footer />
        </>
    )
}

export default TipoUsuarios;
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista"
import "./CadastroTipoDeEvento.css";
import Cadastro from "../../components/cadastro/Cadastro";
import banner_cadastrotipoevento from "../../assets/img/cadastrotipoevento.png"
import api from "../../Services/services";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';



const CadastroTipoDeEvento = () => {
    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])


    function alertar(icone, mensagem){
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



    async function cadastrarTipoEvento(e) {
        e.preventDefault();

        // alertar("teste")
        if (tipoEvento.trim() !== "") {

            try {
                await api.post("TiposEventos", { tituloTipoEvento: tipoEvento });
                alertar("success", "Cadastro realizado com sucesso!")
                setTipoEvento("");
            } catch (error) {
                alertar("error", "Entre em contato com o suporte.")
                console.log(error);

            }
        } else {
            alertar("error", "O campo precisa estar preenchido!")
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            // console.log(resposta.data);
            setListaTipoEvento(resposta.data);

        } catch (error) {
              alertar("error", "Entre em contato com o suporte.");
        }
    }

    async function editarTipoEvento(tiposEventos) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique seu Tipo Evento",
            input: "text",
            confirmButtonColor: '#610315',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Tipo Evento",
            inputValue: tiposEventos.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoTipoEvento) {
            try {
                await api.put(`tiposEventos/${tiposEventos.idTipoEvento}`,
                    { tituloTipoEvento: novoTipoEvento });
                alertar("success", "Tipo Evento Modificado!")
            } catch (error) {

            }
            Swal.fire(`Seu novo Tipo Evento: ${novoTipoEvento}`);
        }
    }


    async function deletarTipoEvento (id) {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#610315",
            cancelButtonColor: "#000000",
            confirmButtonText: 'Sim, apagar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`TiposEventos/${id.idTipoEvento}`);
                alertar("success", "Tipo de evento excluído!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao excluir")
        })
    }



    useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento])


    return (
        <>
            <Header 
            nomeusu="Administrador"/>

            <Cadastro
                img_banner={banner_cadastrotipoevento}
                titulo_cadastro="Cadastro Tipo de Evento"
                nomes="Titulo"
                visible="none"
                // selecione="Selecione"
                funcCadastro={cadastrarTipoEvento}
                valorInput={tipoEvento}
                setValorInput={setTipoEvento}
                data="none"
                />

            <Lista
                titulo_lista="Tipo Evento"
                titulo="Titulo"
                visibilidade="none"
                
                lista={listaTipoEvento}

                tipoLista="TiposEventos"

                funcEditar={editarTipoEvento}
                funcExcluir={deletarTipoEvento}
            />


            <Footer />

        </>
    )
}

export default CadastroTipoDeEvento;
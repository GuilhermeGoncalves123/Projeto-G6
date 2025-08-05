import React, { useEffect, useState } from 'react'
import Lixeira from "../../assets/img/lixieravermelha.png"
import api from '../../Services/services'
import "./Modal.css"
import { useAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2';

export const Modal = (props) => {

    const [comentarios, setComentarios] = useState([]);

    const [novoComentario, setNovoComentario] = useState("");
    // const [usuarioId, setUsuarioId] = useState("");

    const { usuario } = useAuth();



    
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
    

    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`)
            setComentarios(resposta.data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarComentarios();
    }, [comentarios])


    async function cadastrarComentario(comentario) {
        let timerInterval;
        Swal.fire({
            title: "Aguarde!",
            html: "Alguns segundos!",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 3000);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then(async (result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                // console.log("I was closed by the timer");
                try {
                    await api.post("comentariosEventos", {
                        idUsuario: usuario.idUsuario,
                        idEvento: props.idEvento,
                        Descricao: comentario
                    })
                } catch (error) {
                    console.log(error.response.data);
                    alertar("error", error.response.data)
                }


            }
        });
    }


    async function deletarComentario(idComentario) {
        try {
            await api.delete(`comentariosEventos/${idComentario}`);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}> </div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModal === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) =>
                                <div key={item.idComentarioEvento}>
                                    <strong>
                                        {item.usuario.nomeUsuario}
                                    </strong>
                                    <img src={Lixeira} alt="Deletar"
                                        onClick={() => deletarComentario(item.idComentarioEvento)} />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            )}
                            <div>
                                <input type="text" placeholder="Escreva seu comentário..."
                                    value={novoComentario}
                                    onChange={(e) => setNovoComentario(e.target.value)} />
                                <button className='botao_cadas' onClick={() => cadastrarComentario(novoComentario)} >Cadastrar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Modal;
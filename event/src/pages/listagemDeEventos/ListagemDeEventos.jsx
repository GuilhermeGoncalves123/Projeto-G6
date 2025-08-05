import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/Comentario.png";
import "./ListagemDeEventos.css";
import Toggle from "../../components/toggle/Toggle";
import descricao from "../../assets/img/informacao(preto).png";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import { format } from "date-fns";
import { Modal } from "../../components/modal/Modal";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";


function ListagemEvento() {

    const [listaEvento, setListaEvento] = useState([])
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const [filtroData, setFiltroData] = useState(["todos"])

    const { usuario } = useAuth();

    // const [usuarioId, setUsuarioId] = useState("2FA9CD6F-466A-4C2A-A756-712360D23B0F")

    async function listarEventos() {
        try {
            const resposta = await api.get("eventos")
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento)
                return {
                    // as informacoes tanto de eventos quanto de eventos que possuem presenca

                    // ... mantem os dados originais do evento atual
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            });

            setListaEvento(eventosComPresencas);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarEventos();
    }, [])

    function abrirModal(tipo, dados) {
        // tipo de modal
        // dados 
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca, dtEvento) {

        try {
            if (presenca && idPresenca != "") {
                console.log("Aqui 01");
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })
                Swal.fire('Removido!', 'Sua presença foi removida.', "success");

            } else if (idPresenca !== null) {
                console.log("Aqui 02");
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmada!', 'Sua presença foi confirmada', 'success');
            } else {
                 const hoje = new Date();
                 const dataEvento = new Date(dtEvento)
                 console.log(hoje);
                 console.log(dataEvento);
                if(dataEvento >= hoje){
    
                    await api.post("PresencasEventos", { situacao: true, idUsuario: usuario.idUsuario, idEvento: idEvento })
                    Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success')
                }else{
                    alert("ixi nao pode")
                }
            }


            listarEventos();

        } catch (error) {
            console.log(error);
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEvento.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;

            return false;
        });
    }


    return (
        <>
            <Header
                nomeusu="Aluno"
                visibilidade="none" />

            <section className="lista_evento ">
                <h1>Eventos</h1>
                <hr className="linha_titulo" />


                <div className="tabela_listagem layout_grid">

                    <div className="left  seletor">
                        <label htmlFor="eventos"></label>
                        <select name="eventos" id="" onChange={(e) => setFiltroData([e.target.value])}>
                            <option value="todos" selected>Todos os eventos</option>
                            <option value="futuros">Somente futuros</option>
                            <option value="passados">Somente passados</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr className="cabecalho_listagem ">
                                <th className="">Título</th>
                                <th className="">Data Do Evento</th>
                                <th className="">Tipo Evento</th>
                                <th className="">Descrição</th>
                                <th className="">Comentários</th>
                                <th className="">Participar</th>
                            </tr>
                        </thead>
                        {/* <hr className="divi" /> */}
                        <tbody>
                            {listaEvento.length > 0 ? (
                                filtrarEventos() && filtrarEventos().map((item) => (
                                    <tr className="item_listagem espaco">
                                        <td className="" data-cell="Título">{item.nomeEvento}</td>
                                        <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                        <td className="" data-cell="Tipo Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                        <td className=" img_descricao" data-cell="Descrição">
                                            <img src={descricao} alt="" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })} />
                                        </td>
                                        <td className="" data-cell="Comentários">
                                            <img src={Comentario} alt="" onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })} />
                                        </td>
                                        <td className="" data-cell="Participar">
                                            <Toggle
                                                presenca={item.possuiPresenca}
                                                manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca, item.dataEvento)}
                                            />
                                        </td>




                                    </tr>
                                ))
                            ) : (
                                <p>Nenhum evento encontrado</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />

            {modalAberto && (
                <Modal
                    titulo={tipoModal == "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModal={tipoModal}
                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.descricao}


                    fecharModal={fecharModal}
                />
            )}
        </>
    )
}

export default ListagemEvento;

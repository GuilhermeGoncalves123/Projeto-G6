import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro} action="" className="layuot_grid form_cadastro">
                <h1>{props.titulo_cadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className="banner_cadastro">
                        <img src={props.img_banner} />
                    </div>
                    <div className="campo_preen">
                        <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder={props.nomes}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)} />
                        </div>
                        <div className="campo_cad_nome">
                            <input type="date" style={{ display: props.data }}
                            value={props.valorDate}
                            onChange={(e) => props.setValorDate(e.target.value)} />
                        </div>

                        <div className="campo_cad_evento" style={{ display: props.visible }}>
                            <label htmlFor="evento"></label>
                            <select name="tipoDeEvento" id=""
                                value={props.valorSelect}
                                onChange={(e) => props.setValorSelect(e.target.value)}>
                                <option value="" disabled selected>Tipo Evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((itemTipoEvento) => (
                                    (
                                        <option value={itemTipoEvento.idTipoEvento}>{itemTipoEvento.tituloTipoEvento}</option>
                                    ))
                                )}

                            </select>
                        </div>
                        <div className="campo_cad_evento" style={{ display: props.visible }}>
                            <select name="" id=""
                                value={props.valorSelect2}
                                onChange={(e) => props.setValorSelect2(e.target.value)}>
                                <option value="">Senai</option>
                            </select>
                        </div>
                        <div className="campo_cad_evento" style={{ display: props.visible }}>
                            <textarea name="" id="" placeholder="Descrição" className="descricao"
                                value={props.valorText}
                                onChange={(e) => props.setValorText(e.target.value)}></textarea>
                        </div>

                        <Botao nomeDoBotao="Cadastrar" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Cadastro;
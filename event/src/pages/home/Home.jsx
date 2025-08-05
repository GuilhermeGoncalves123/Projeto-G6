
// import Footer from "../../components/footer/Footer";
// // import Header from "../../components/header/Header";
// import BannerPrincipal from "../../assets/img/marsala.png";
// import { Link } from "react-router-dom";
// import Logo1 from "../../assets/img/logo1.svg"

// import "./Home.css";

// const Home = () => {
//   // Lista de eventos com textos diferentes
//   const eventos = [
//     {
//       titulo: "Participe de Eventos Exclusivos",
//       descricao:
//         "Esteja presente nos principais eventos de T.I. do país. Networking, conteúdo de ponta e experiências únicas te esperam.",
//     },
//     {
//       titulo: "Conheça os Líderes da Inovação",
//       descricao:
//         "Palestras com especialistas, cases de sucesso e insights que vão transformar sua carreira e sua visão de tecnologia.",
//     },
//     {
//       titulo: "Desenvolva Novas Habilidades",
//       descricao:
//         "Workshops práticos, desafios de programação e trilhas técnicas para quem quer ir além da teoria.",
//     },
//     {
//       titulo: "Faça Parte da Comunidade Tech",
//       descricao:
//         "Conecte-se com devs, startups e empresas. Encontre seu lugar em uma rede colaborativa que não para de crescer.",
//     },
//   ];

//   return (
//     <>
//       <header
//         >
//             <div className="layout_grid cabecalho">
//                 <img src={Logo1} alt="Logo Evento" />
//                 <nav>
//                      <Link className="link_header" to="/" href="">Home</Link>
//                      <Link className="link_header" to="/ListaEventos" href="">Eventos</Link>
//                      <Link className="link_header" to="/TipoEvento" href="">Usuários</Link>
//                      <Link className="link_header" href="">Contatos</Link>
//                 </nav>
//                 <div className="Adm">
//                     <Link to="/">
//                     <button className="botao_logar" to="/">Logar</button>
//                     </Link>
//                 </div>

//             </div>
//         </header>

//       <main>
//         {/* Banner principal */}
//         <div className="div-banner-principal">
//           <img src={BannerPrincipal} alt="Imagem principal do evento" />
//         </div>

//         {/* Seção de eventos */}
//         <section className="secao-eventos">
//           <h2>Próximos Eventos</h2>
//           <hr />
//           <div className="conjunto-cards">
//             {eventos.map((evento, index) => (
//               <div className="cartao-evento" key={index}>
//                 <h2>{evento.titulo}</h2>
//                 <p>{evento.descricao}</p>
//                 <Link className="link-evento" to="/">
//                   Conectar
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Banner secundário */}
//         <section className="banner-secundario">
//           <h2>Visão</h2>
//           <hr />
//           <div className="texto-secundario">
//             <p className="visao">
//               Nossa visão é impulsionar o desenvolvimento tecnológico através de
//               experiências únicas em eventos de T.I. Acreditamos que a troca de
//               conhecimento, o networking qualificado e o acesso a conteúdos
//               relevantes são essenciais para a evolução da comunidade tech.
//               Queremos ser referência na promoção de encontros que conectam
//               pessoas, inspiram ideias e aceleram a inovação.
//             </p>
//           </div>
//         </section>

        
//         <section className="secao-contato">
//             <div></div>
//           <h2 className="ctt">Contato</h2>
//           <hr/>
//           <div className="area-contato">
//             <div className="mapa-local">
//               <iframe
//                 title="Mapa de localização"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7689025400157!2d-46.57043748491249!3d-23.575540084673492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c2781d6467d%3A0x8e4d5fbd1679e911!2sRua%20Niter%C3%B3i%2C%20180%20-%20Centro%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1717523828833!5m2!1spt-BR!2sbr"
//                 width="300px"
//                 height="250"
//                 frameBorder="0"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//             <div className="info-local">
//               <p>Rua Niterói, 180 - Centro</p>
//               <p>São Caetano do Sul - SP</p>
//               <p>(11) 4225-2000</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Home;





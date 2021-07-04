import { Container } from "./styles";
import entradaImg from "../../assets/entradas.svg"
import saidaImg from "../../assets/saidas.svg"
import totalImg from "../../assets/total.svg"


export function Summary(){
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={entradaImg} alt="Entradas" />
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={saidaImg} alt="Saidas" />
                </header>
                <strong>R$500,00</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    );
}
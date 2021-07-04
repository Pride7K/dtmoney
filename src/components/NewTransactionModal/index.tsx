import Modal from "react-modal";
import { Container,TransactionContainer,RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import entradaImg from "../../assets/entradas.svg";
import saidaImg from "../../assets/saidas.svg";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

interface NewTransactionModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export function NewTransactionModal({
  onRequestClose,
  isOpen,
}: NewTransactionModalProps) {

  const [type,setType] = useState("deposit")
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [value,setValue] = useState(0)

  function handleCreateNewTransaction(e:FormEvent){
    e.preventDefault();

    const data = {
      type,
      title,
      category,
      value
    }
    api.post("transactions",data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close" type="button" onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container
      onSubmit={(e)=> handleCreateNewTransaction(e)}
      >
        <h2>Cadastrar transação</h2>
        <input 
        type="text" 
        placeholder="Título"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        />

        <input 
        type="number" 
        placeholder="Valor"
        value={value}
        onChange={(e)=> setValue(+e.target.value)}
        />
        <TransactionContainer>
          <RadioBox
          type="button"
          onClick={()=> setType("deposit")}
          isActive={type === "deposit"}
          activeColor="green"
          >
            <img src={entradaImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
          type="button"
          onClick={()=> setType("withdraw")}
          isActive={type === "withdraw"}
          activeColor="red"
          >
            <img src={saidaImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionContainer>

        <input 
        type="text" 
        placeholder="Categoria"
        value={category}
        onChange={(e)=> setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}

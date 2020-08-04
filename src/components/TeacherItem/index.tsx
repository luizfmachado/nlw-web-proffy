import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem = () => {
  return (
    <article className="teacher-item">
        <header>
          <img src="https://avatars2.githubusercontent.com/u/56140722?s=460&u=056feec0cae067772408fc8f7000bfb3158f5bdd&v=4" alt="Luiz Felipe Machado"/>
          <div>
            <strong>Luiz Felipe Machado</strong>
            <span>Química</span>
          </div>
        </header>
        <p>
          Entusiasta nas melhores tecnologias de química avançada.
          <br/> <br/>
          Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiêcias.
        </p>

        <footer>
          <p>
            Preço/hora
            <strong>R$ 100,00</strong>
          </p>
          <button type='button'>
            <img src={whatsappIcon} alt="whatsapp"/>
            Entrar em contato
          </button>
        </footer>
      </article>
  )
}

export default TeacherItem;

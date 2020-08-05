import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api';

export interface Teacher {
  id: string;
  subject: string;
  cost: string;
  schedules: {
    id: string;
    weekDay: number;
    from: number;
    to: number;
  };
  userId: {
    id: string;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    updatedAt: string;
    createdAt: string;
  };
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function handleCreateConnection() {
    api.post('connections', {
      userId: teacher.userId.id
    })
  }

  return (
    <article className="teacher-item">
        <header>
          <img src={teacher.userId.avatar} alt={teacher.userId.name}/>
          <div>
            <strong>{teacher.userId.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>

        <p>{teacher.userId.bio}</p>

        <footer>
          <p>
            Preço/hora
            <strong>R$ {teacher.cost}</strong>
          </p>
          <a
            target="_blank"
            onClick={handleCreateConnection}
            href={`https://wa.me/${teacher.userId.whatsapp}`}
          >
            <img src={whatsappIcon} alt="whatsapp"/>
            Entrar em contato
          </a>
        </footer>
      </article>
  )
}

export default TeacherItem;

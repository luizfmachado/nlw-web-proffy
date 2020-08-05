import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

export default () => {

  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekday] = useState('')
  const [time, setTime] = useState('')

  async function handleSearchTeacher(e: FormEvent) {
    e.preventDefault()
    const response = await api.get('classes', {
      params: {
        subject,
        weekDay: week_day,
        time
      }
    })
    console.log(response.data)
    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title='Estes são os proffys disponíveis.'>
        <form id="search-teachers" onSubmit={handleSearchTeacher}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              {value: "Artes", label: "Artes"},
              {value: "Biologia", label: "Biologia"},
              {value: "Ciências", label: "Ciências"},
              {value: "Educação Física", label: "Educação Física"},
              {value: "Matemática", label: "Matemática"},
              {value: "Química", label: "Química"},
              {value: "Poruguês", label: "Poruguês"},
              {value: "História", label: "História"},
              {value: "Geografia", label: "Geografia"},
              {value: "Física", label: "Física"},
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            onChange={e => setWeekday(e.target.value)}
            options={[
              {value: "0", label: "Domingo"},
              {value: "1", label: "Segunda-feira"},
              {value: "2", label: "Terça-feira"},
              {value: "3", label: "Quarta-feira"},
              {value: "4", label: "Quinta-feira"},
              {value: "5", label: "Sexta-feira"},
              {value: "6", label: "Sábado"},
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.userId.id} teacher={teacher}/>
        })}
      </main>
    </div>
  )
}

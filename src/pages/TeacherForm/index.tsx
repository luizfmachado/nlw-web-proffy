import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';

export default () => {
  const history = useHistory()
  const [itemSchedule, setItemSchedule] = useState([
    {week_day: 0, from: "", to: ""},
  ])

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  function handleAddSchedule() {
    setItemSchedule([
      ...itemSchedule,
      {week_day: 0, from: "", to: ""},
    ])
  }

  function setScheduleValue(position: number, field: string, value: string) {
    const updatedSchedule = itemSchedule.map((element, index) => {
      if (index === position) {
        return { ...element, [field]: value}
      }
      return element
    })

    setItemSchedule(updatedSchedule)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()
    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: itemSchedule
    }).then(() => {
      alert('Cadastro realizado com sucesso.')
      history.push('/')
    }).catch((err) => {
      alert('Erro ao cadastrar')
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher a formulário de inscrição'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {setAvatar(e.target.value)}}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {setWhatsapp(e.target.value)}}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {setBio(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {setSubject(e.target.value)}}
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {setCost(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddSchedule}>+ Novo horário</button>
            </legend>

            {itemSchedule.map((item, index) => {
              return (
                <div className="schedule-item" key={index}>
                  <Select
                    name="week_day"
                    value={item.week_day}
                    label="Dia da Semana"
                    onChange={e => setScheduleValue(index, 'week_day', e.target.value)}
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
                    name="from"
                    label="Das"
                    value={item.from}
                    onChange={e => setScheduleValue(index, 'from', e.target.value)}
                    type="time"
                  />
                  <Input
                    name="to"
                    value={item.to}
                    onChange={e => setScheduleValue(index, 'to', e.target.value)}
                    label="Até"
                    type="time"
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br/> Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

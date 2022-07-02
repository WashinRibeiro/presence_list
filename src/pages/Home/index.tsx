import "./styles.css";
import { Card } from "../../components/Card";
import { useState, useEffect } from "react";

interface User {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<any| []>([])
  const [user, setUser] = useState<User>({name: '', avatar: ''});

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    if (newStudent.name !== '' || newStudent.name !== null) {
      setStudents((prevState: any) => [...prevState, newStudent]);
    } else {
      console.log('Erro')
    }
  }

  useEffect(() => {
    fetch("https://api.github.com/users/washinRibeiro")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong> {user.name} </strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />

      <button
        type="button"
        onClick={handleAddStudent}
      >
        Adicionar
      </button>

      {students.map((student: any) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

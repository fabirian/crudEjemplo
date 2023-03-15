import React, { useState , useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {

  const Url = "https://localhost:44303/api/estudiantes";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado]=useState({
    id: '',
    nombre: '',
    apellido: '',
    genero: '',
    materia: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setEstudianteSeleccionado({
      ...estudianteSeleccionado,
      [name]: value
    });
    console.log(estudianteSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet =async () =>{
    await axios.get(Url).then(response => {setData(response.data)}).catch(error => {console.log(error);})
  }

  const peticionPost=async()=>{
    delete estudianteSeleccionado.id;
    estudianteSeleccionado.id=parseInt(estudianteSeleccionado.id);
    await axios.post(Url, estudianteSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    estudianteSeleccionado.lanzamiento=parseInt(estudianteSeleccionado.lanzamiento);
    await axios.put(Url+"/"+estudianteSeleccionado.id, estudianteSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(estudiante=>{
        if(estudiante.id===estudianteSeleccionado.id){
          estudiante.nombre=respuesta.nombre;
          estudiante.apellido=respuesta.apellido;
          estudiante.genero=respuesta.genero;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(Url+"/"+estudianteSeleccionado.id)
    .then(response=>{
     setData(data.filter(estudiante=>estudiante.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarEstudiante=(estudiante, caso)=>{
    setEstudianteSeleccionado(estudiante);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }


  useEffect(()=> {
    peticionGet();
  }, [])

  return (
    <div className="App">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo Estudiante</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Materia</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
          {data.map(estudiante => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.materia}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarEstudiante(estudiante, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>seleccionarEstudiante(estudiante, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Estudiante</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre"  onChange={handleChange}/>
          <br />
          <label>Apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
          <br />
          <label>Genero: </label>
          <br />
          <input type="text" className="form-control" name="genero" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Estudiante</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <label>ID: </label>
          <br />
          <input type="text" className="form-control" readOnly value={estudianteSeleccionado && estudianteSeleccionado.id}/>
          <br />
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={estudianteSeleccionado && estudianteSeleccionado.nombre}/>
          <br />
          <label>Apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange} value={estudianteSeleccionado && estudianteSeleccionado.apellido}/>
          <br />
          <label>Genero: </label>
          <br />
          <input type="text" className="form-control" name="genero" onChange={handleChange} value={estudianteSeleccionado && estudianteSeleccionado.genero}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el estudiante de Base de datos {estudianteSeleccionado && estudianteSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;

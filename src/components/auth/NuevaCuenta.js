import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Extraer proyectos de state inicial
    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    // Extraer valores del context
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if ( autenticado ) {
            props.history.push('/proyectos');
        }

        if ( mensaje ) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesión
    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // Extraer valores de usuario.
    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {

        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
        
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if ( nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return;
        }

        // Password minimo de 6 caracteres
        if ( password.length < 6 ) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 passwords son iguales
        if ( password !== confirmar ) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })

    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1 className="login-h1">Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="email"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Ya tengo una Cuenta
                </Link>

            </div>
        </div>
    );
}

export default NuevaCuenta;
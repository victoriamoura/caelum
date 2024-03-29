import { useRef, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthThunkActions } from '../../store/ducks/auth';

import Cabecalho from '../../components/Cabecalho';
import Widget from '../../components/Widget';

import './loginPage.css';
import LoginServices from '../../services/LoginServices';
import NotificacaoContext from '../../contexts/notificacaoContext';
import useValidations from '../../hooks/useValidations';
import useFormValidator from '../../hooks/useFormValidator';

function LoginPage() {
    const inputLogin = useRef();
    const inputSenha = useRef();
    const history = useHistory();
    const authState = useSelector( state => state.auth )
    const dispatch = useDispatch();
    const setNotificacao = useContext(NotificacaoContext);
    const {isEmpty} = useValidations();
    const { erros, isFormValid, validate } = useFormValidator({
        login: isEmpty('Login é obrigatório.'),
        senha: isEmpty('Senha é obrigatória.')
    });

    useEffect(() => {
        if(authState.error) {
            setNotificacao(authState.error);
        } else if(authState.status === 'LOGGED_IN') {
            history.push('/');
            setNotificacao('Login realizado com sucesso.');
        }
    }, [authState.error, authState.status]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let login = inputLogin.current.value.trim();
        let senha = inputSenha.current.value.trim();
        dispatch(AuthThunkActions.login(login, senha))
    }

    return (
        <>
            <Helmet>
                <title>Tweetelum | Entrar na conta</title>
            </Helmet>
            <Cabecalho />
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h2 className="loginPage__title">Seja bem vindo!</h2>
                        <form className="loginPage__form" action="/" onSubmit={handleLoginSubmit}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input ref={inputLogin} onBlur={validate} className="loginPage__input" type="text" id="login" name="login" />
                                {erros.login && <span class="login__status">{erros.login}</span>}
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input ref={inputSenha} onBlur={validate} className="loginPage__input" type="password" id="senha" name="senha" />
                                {erros.senha && <span class="login__status">{erros.senha}</span>}
                            </div>
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit" disabled={!isFormValid}>Logar</button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        </>
    )
}
export default LoginPage;
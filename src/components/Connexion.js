import React, {Component} from 'react';
import '../App.css'
import '../animations.css'

import {Redirect} from "react-router-dom";
// Animations
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default class Connexion extends Component {
    state = {
        pseudo: '',
        goToChat: false
    }

    handleChange = event => {
        const pseudo = event.target.value
        this.setState({pseudo})
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({goToChat: true})
    }

    render() {

        if (this.state.goToChat) {
            return <Redirect push to={`/pseudo/${this.state.pseudo}`}/>
        }

        return (
            <div className='connexionBox'>
                <form className='connexion' onSubmit={this.handleSubmit}>
                    <h2 className='connexionWelcome'> Bienvenue sur ChatBox </h2>
                    <hr/>
                    <input
                        type='text'
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                        required
                        placeholder="Choisir votre pseudo"
                    />
                    <CSSTransition
                        /*classNames='button-effect'
                        timeout={200}*/>
                        <button type='submit'>
                            GO
                        </button>
                    </CSSTransition>
                </form>
            </div>
        );
    }
}



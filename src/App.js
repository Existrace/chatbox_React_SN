import React, {Component, createRef} from 'react'
import './App.css'
import './animations.css'
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

// Firebase
import bdd from './bdd'

// Animations
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'

class App extends Component {
    state = {
        messages: {},
        // Récupère le pseudo grâce aux params stockés par le routeur
        pseudo: this.props.match.params.pseudo
    }

    messageRef = createRef()

    componentDidMount() {
        // Synchronisation base de données
        bdd.syncState('/', {
                context: this,
                state: 'messages'
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ref = this.messageRef.current
        // Le scroll revient en bas à chaque nouveau message
        ref.scrollTop = ref.scrollHeight
    }

    addMessage = message => {
        // Ajoute un message à la liste des messages
        const messages = {...this.state.messages}
        messages[`message-${Date.now()}`] = message
        // Supprime les messages qui dépassent le nombre max de messages
        Object
            .keys(messages)
            .slice(0, -30)
            .forEach(key => {
                messages[key] = null
            })

        this.setState({messages})
    }

    isUser = pseudo => pseudo === this.state.pseudo

    render() {
        const messages = Object
            .keys(this.state.messages)
            .map(key => (
                <CSSTransition
                    timeout={200}
                    classNames='fade'
                    key={key}>
                    <Message
                        isUser={this.isUser}
                        pseudo={this.state.messages[key].pseudo}
                        message={this.state.messages[key].message}
                        date={this.state.messages[key].date}
                    />
                </CSSTransition>
            ))

        return (
            <div className='box'>
                <p>Connecté(e) - <strong>{this.state.pseudo}</strong></p>
                <div>
                    <div className='messages' ref={this.messageRef}>
                        <TransitionGroup className='message'>
                            {messages}
                        </TransitionGroup>
                    </div>
                </div>
                <Formulaire
                    length={120}
                    addMessage={this.addMessage}
                    pseudo={this.state.pseudo}
                />
            </div>
        )
    }
}

export default App

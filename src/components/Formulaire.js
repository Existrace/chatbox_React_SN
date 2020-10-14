import React, {Component} from 'react';
import moment from 'moment';
import {FaSmile, FaImages} from 'react-icons/fa';

// Use emoji-mart for emoi
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'

// Avoir l'heure locale
const getTime = dateTime => {
    return moment(dateTime).format('HH:mm') // 13:35
}

class Formulaire extends Component {
    state = {
        message: '',
        length: this.props.length,
        isClicked: false,
        image : ''
    }

    // Ref pour l'input file
    input = React.createRef()

    createMessage = () => {
        const {addMessage, pseudo, length} = this.props

        // Récupère l'heure française
        moment.locale('fr')

        const message = {
            pseudo,
            message: this.state.message,
            date: getTime(),
            image : this.state.image
        }

        // Ajout d'un message dans la liste des messages
        addMessage(message)

        // Reset
        this.setState({message: '', length, isClicked: false})
        // Fermer fenêtre émoji
    }

    handleSubmit = event => {
        event.preventDefault();
        this.createMessage()
    }

    /* Gère l'ajout d'image */
    handleChangeImage = ({target}) => {
        if (target.files && target.files[0]) {
            let reader = new FileReader()

            console.log(target.files[0].name)

            reader.onloadend = () =>
                document.querySelector('#img').setAttribute('src', reader.result);

            reader.readAsDataURL(target.files[0])

            this.setState({image: target.files[0].name})
        }
    }

    /*
    Permet de masquer ou non
    * la fenêtre des emotes
    */
    handleClickActiveEmote = event => {
        this.setState(state => ({
            isClicked: !state.isClicked
        }));
    }

    // Ajout des emotes dans le textarea
    handleEmojiClick = (e) => {
        // Permet d'avoir l'emoji en 'clair'
        let emoji = e.native
        this.setState({
            message: this.state.message + emoji,
            length: this.state.length - 1
        })
    }

    handleChange = event => {
        const message = event.target.value
        // décompte le nombre de caractère du message en plein tappage
        const length = this.props.length - message.length
        this.setState({message, length})
    }

    handleKeyUp = event => {
        // Permet d'envoyer un message grâce à l'appuie
        if (event.key === 'Enter') {
            this.createMessage()
        }
    }

    render() {

        const isClicked = this.state.isClicked

        return (
            <>
                <form
                    className='form'
                    onSubmit={this.handleSubmit}>
                <textarea
                    onChange={this.handleChange}
                    value={this.state.message}
                    maxLength={this.props.length}
                    onKeyUp={this.handleKeyUp}
                />
                    <div className='info'>
                        <div className="image-upload">
                            <img width='20%' height='20%' id="img"/>
                            <br/>
                            <label htmlFor="file-input">
                                <FaImages/>
                            </label>
                            <input id="file-input" type="file"
                                   accept="image/*" ref={this.input}
                                   onChange={this.handleChangeImage}
                            />
                        </div>
                        <a className='link-icon' href='#'
                           onClick={this.handleClickActiveEmote}>
                            <FaSmile/>
                        </a>
                        {isClicked &&
                        <div className="picker">
                            <Picker
                                onSelect={this.handleEmojiClick}
                                i18n={{
                                    search: 'Recherche',
                                    categories: {search: 'Résultats de recherche', recent: 'Récents'}
                                }}
                            />
                        </div>
                        }
                        <br/>
                        {this.state.length}
                    </div>
                    <button type='submit'>
                        Envoyer
                    </button>
                </form>
            </>
        );
    }
}

export default Formulaire;

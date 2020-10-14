import React, {useState} from 'react';
import Picker from 'emoji-picker-react';

const Emoji = (message) => {

    /* Hook */
    const [chosenEmoji, setChosenEmoji] = useState(null)

    const handleEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject)
        /*message: this.state.message + this.state.chosenEmoji*/
    }

    return (
        <div>
            <div className='picker'>
                <Picker
                    disableSearchBar={true}
                    onEmojiClick={handleEmojiClick}
                />
                {chosenEmoji &&
                    <span>{chosenEmoji.emoji}</span>
                }
            </div>

        </div>
    );

}

export default Emoji;

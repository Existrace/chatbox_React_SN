import React, {Component} from 'react';

class Home extends Component {

    onChange = e => {
        let files = e.target.files;
        console.log(files);
        let reader = new FileReader();
        reader.onload = r => {
            console.log(r.target.result);
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <div>
                <h1>Upload File Here</h1>
                <input type="file" name="file" onChange={e => this.onChange(e)}/>
            </div>
        );
    }
}

export default Home;

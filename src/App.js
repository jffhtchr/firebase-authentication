import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './Components/Common';
import LoginForm from './Components/LoginForm';

class App extends Component {
    state = { loggedIn: null }

    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyBjQSgLSTfF4FfJQj-Y2YvMPrCxILuYJoI',
            authDomain: 'authentication-dc9bc.firebaseapp.com',
            databaseURL: 'https://authentication-dc9bc.firebaseio.com',
            projectId: 'authentication-dc9bc',
            storageBucket: 'authentication-dc9bc.appspot.com',
            messagingSenderId: '42915257701'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true});
            } else {
                this.setState({ loggedIn: false });
            }
        }); //event handler based on if the user has signed in or signed out. If the 'user' object exists, the user is signed in.
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true: 
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                )
            case false:
                return <LoginForm />
            default:
                return (
                    <View style={styles.spinnerStyle}>
                        <Spinner size='large' />
                    </View>
                )
        }        
    }

    render(){
        return (
            <View>
                <Header headerText = 'Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    spinnerStyle: {
        alignSelf:'center'
    }
}

export default App;
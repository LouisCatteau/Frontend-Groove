import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';



export default function Connect1Screen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [displaySignIn, setDisplaySignIn] = useState(false)

  const dispatch = useDispatch()

  const popSignIn = () => {
  
    setDisplaySignIn(!displaySignIn)
  }

  const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username : username, password : password}),
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          dispatch(login({ username: username, token: data.token }));
          setUsername('');
          setPassword('');
          setDisplaySignIn(false)
          router.push('/')

        }
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={30} color="#19525a" />
        </TouchableOpacity>
        <Text style={styles.title}>Connect</Text>
      </View>

      <View style={styles.buttonsContain}>
        <View >
          <Text style={styles.text}>J'ai déjà un compte :</Text>
          <TouchableOpacity onPress={() => popSignIn()} style={styles.connexionButton}>
            <Text style={styles.connexion}>Connexion</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={displaySignIn} style={styles.modalContainer} transparent={true}>
        <View style={styles.modalBackground}>
          
          <View style={styles.signInContainer}>
          <TouchableOpacity onPress={popSignIn} >
            <Text style={styles.close}>X</Text>
          </TouchableOpacity>
            <TextInput placeholder="username" onChangeText={(value) => setUsername(value)}
              value={username} style={styles.input}/>
            <TextInput placeholder="password" onChangeText={(value) => setPassword(value)}
              value={password} style={styles.input}/>
            <TouchableOpacity onPress={() => handleConnection()}>
              <Text style={styles.modalconnexion}>Connexion</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Modal>

        <View >
          <Text style={styles.text}>Je veux créer un compte :</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Connect2')} style={styles.inscriptionButton}>
            <Text style={styles.inscription}>Inscription</Text>
          </TouchableOpacity>
        </View>
        <Text>--------------- ou ---------------</Text>

        <Text>Google Connexion</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: '#000000',
    marginLeft: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    alignContent: "center",
    color: '#19525a',
    fontWeight: "500",
    marginRight: 80
  },
  buttonsContain: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  inscriptionButton: {
    backgroundColor: '#19525a',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

  },
  connexionButton: {
    backgroundColor: '#d2fff4',
    height: 76,
    width: 264,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontWeight: "300"
  },
  text: {
    fontSize: 25,
    color: '#19525a',
    fontWeight: "600",
    marginBottom: 5

  },
  inscription: {
    fontWeight: "600",
    color: "white",
    fontSize: 25


  },
  connexion: {
    fontWeight: "600",
    color: '#19525a',
    fontSize: 25

  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalconnexion: {
    fontSize: 18,
    fontWeight: "400",
    backgroundColor: '#19525a',
    borderRadius : 6,
    padding: 5,
    color: "white"

  },
  signInContainer: {
    height: 300,
    width: 250,
    alignItems: 'center',
    backgroundColor: "#D2FFF4",
    flexDirection: ' column',
    justifyContent: 'space-around',
    borderRadius: 30,
    padding: 35,
    borderColor : '#19525a', 
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontSize: 30,
  },
  close: {
    justifyContent: "flex-end",
    fontSize: 18,
    fontWeight : "600"
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#19525a',
    borderRadius: 8,
    height: 50,
    fontSize : 15,
  
  },


})

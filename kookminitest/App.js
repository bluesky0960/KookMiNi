import React from 'react';
import {StyleSheet, TouchableOpacity, Text, TextInput, View} from 'react-native';


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state={input:""};
    }
    _handleText= (text) =>{

      this.setState({input: text});
    };
    search =(input)=>{
        if(input == "드랍각"){
          alert("말다했냐?");
        }
        else{
          alert("a");
        }
    };
    note=()=>{

    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    You input: {this.state.input}
                </Text>


                <TextInput style={styles.input}
                    onChangeText={this._handleText}
                />
                <TouchableOpacity
                    style = {styles.searchButton}
                    onPress = {
                        () => this.search(this.state.input)
                    }>
                    <Text style = {styles.searchButtonText}> Search </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                    ()=>this.note()
                }>
                    <Text style={styles.searchButtonText}>저장</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    welcome:{ fontSize:20, textAlign: "center", margin: 10},
    input:{
      fontSize: 20,
        borderWidth: 2,
        padding: 2,
        height: 40,
        width: 100,
        textAlign: "center"
    },
    searchButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    button:{
      backgroundColor: '#7a54d5',
        padding: 10,
        margin:15,
        height:40,
    },
    searchButtonText:{
        color: 'white'
    }

});

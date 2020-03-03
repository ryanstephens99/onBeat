import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

class StartWorkoutScreen extends Component {

    state = {
        timer: null,
        counter: '00',
        milliseconds: '00',
        startDisabled: true,
        stopDisabled: false
    }

    constructor( props ) {
        
        super( props );
        //start the watch
        this.onButtonStart = this.onButtonStart.bind(this);
        //stop the watch
        this.onButtonStop = this.onButtonStop.bind(this);
        //clear the watch , reset
        this.onButtonClear = this.onButtonClear.bind(this);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        this.start();
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.milliseconds) + 1).toString(),
                count = this.state.counter;

            if( Number(this.state.milliseconds) == 99 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }

            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                milliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }

    onButtonStart() {

        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }


    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }


    onButtonClear() {
        this.setState({
            timer: null,
            counter: '00',
            milliseconds: '00'
        });
    }


    render() {
        return (
        <View style={styles.container}>
            
            {this.state.counter}
            {this.state.miliseconds}
                
            <button title="Start" disabled="disabled"></button>
            <button title="Stop" disabled="disabled"></button>
            <button title="Clear" disabled="disabled"></button>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    }
});

export default StartWorkoutScreen;
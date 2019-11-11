/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
'use strict';

import React, { Component } from "react";
import { TextInput, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Form, Item, Input, ListItem, Title, CheckBox, Body, Icon, Text, Picker, Button, Footer, FooterTab } from "native-base";
import { bold } from "ansi-colors";

export default class SecondScreen extends Component {
  static navigationOptions = {
    title: "Output Screen",
    // headerStyle: {
    //   backgroundColor: "purple"
    // }
  }
  constructor(props) {
    super(props);
    const Nutrients2 = 
      (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: '#28004f', fontWeight: "bold" }}>Nutrients</Text>
        <Text style={{ color: 'blue', fontWeight: "bold" }}>surplus</Text>
        <Text style={{ color: 'black', fontWeight: "bold" }}>or</Text>
        <Text style={{ color: 'red', fontWeight: "bold" }}> deficit </Text>
      </View>
      )
    const Nutrients1 = 
      (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontWeight: "bold"}}> Nutrients</Text>
        <Text style={{fontWeight: "bold"}}> Supplied</Text>
      </View>
      )
    this.state = {
      nutrientsSuppliedLabel: ["Recommendation", Nutrients1, Nutrients2, "Score"],
      recommendations: ["↓", "N", "P", "K", "N", "P", "K","↓"],
      currentNValue: this.props.navigation.state.params.currentNValue,
      solutions: this.props.navigation.state.params.solutions,
      output: this.props.navigation.state.params.output,
      filter: 70,
      top: 10, 

    }
    
  }

  scoreHigher = () =>{
    let output = []
     this.state.solutions.filter((value, ind, arr) => (ind < this.state.top) && (arr[ind][7] >= this.state.filter))
     .forEach(value => output.push(value))
     //console.log(JSON.stringify(this.state.output))
     this.setState({
       output: output,
     })
  }
 

  render() {
    const state = this.state;
    return (
      <Container>
        <Content style={{backgroundColor: "#fff1d6"}}>
        <View style = {[styles.verticalView, styles.centerView]}>

        <View style ={[styles.horizontalView, styles.centerView,{marginLeft: 20}]}>
          <Text>
            Show Top
          </Text>
            <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 50, width: '40%', textAlign: "center", marginBottom: 5 }}
              placeholder="Show Number of Scores "
              defaultValue="10"
              keyboardType="numeric"
              multiline={false}
              onChangeText={numberOfScores => {
               this.setState({top: +numberOfScores}, ()=>{this.scoreHigher()})
          
              }}
            />
            <Text>
              scores
            </Text>
            </View>

            <View style ={[styles.horizontalView, styles.centerView]}>
              <Text>
                Show scores of
              </Text>
            <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 50, width: '40%', textAlign: "center", marginBottom: 5}}
              placeholder="Show Scores Higher Than "
              keyboardType="numeric"
              defaultValue="70"
              multiline={false}
              onChangeText={score => {
               this.setState({filter: +score}, ()=>{this.scoreHigher()})
              }}
            />
            <Text>
              or higher
            </Text>
            </View>
            </View>

        <View>            
            <Table borderStyle = {{borderWidth: 1}}>
        
          
            <TableWrapper >
              <Row data= {["Fertilizer Recommendations Based on Available Grades"]} style={{height: 40, backgroundColor: "#4f92ff",}} textStyle={[styles.text, {color: "white", fontWeight: "bold"}]}></Row>
              <Row data={state.nutrientsSuppliedLabel}  flexArr={[2,3,3,1]} style={[styles.head, {height: 70}]} textStyle={styles.text1} />
              <Row data={state.recommendations} flexArr={[2.02,1,1,1,1,1,1,1]} style={styles.head} textStyle={styles.text1} />
              </TableWrapper>
              <TableWrapper>
                 <Rows data={state.output} flexArr={[2,1,1,1,1,1,1,1]} textStyle={styles.text} style={{borderBottomWidth: 2, borderTopWidth: 2, borderBottomColor: "black", borderTopColor: "grey"}} />
              </TableWrapper>
            </Table>

          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  head2: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  text: { margin: 2, textAlign: "center",},
  text1: { margin: 2, textAlign: "center", fontWeight: "bold" },
  horizontalView: { flexDirection: 'row' },
  verticalView: {flexDirection: "column"},
  centerView: { flex: 1, justifyContent: "center", alignItems: "center" },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
});

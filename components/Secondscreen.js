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
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Text style={{ color: 'blue' }}>Surplus</Text>
        <Text style={{ color: 'red' }}>Deficit</Text>
        <Text style={{ color: 'green' }}> Balance </Text>
      </View>
      )
    const Nutrients1 = 
      (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text> Nutrients Supplied</Text>
      </View>
      )
    this.state = {
      nutrientsSuppliedLabel: [[Nutrients1, Nutrients2], ["Recommendation", "N", "P", "K", "N", "P", "K","Score"]],
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
            <TableWrapper>
              <Row data= {["Fertilizer Recommendations Based on Available Grades"]} style={{height: 40, backgroundColor: "#4f92ff"}} textStyle={[styles.text, {color: "white"}]}></Row>
              <Rows data={state.nutrientsSuppliedLabel}  style={styles.head} textStyle={styles.text} />
              </TableWrapper>
              <TableWrapper>
                 <Rows data={state.output} flexArr={[1,1,1,1,1,1]} textStyle={styles.text} style={{borderBottomWidth: 2, borderTopWidth: 2, borderBottomColor: "black", borderTopColor: "grey"}} />
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
  text: { margin: 2, textAlign: "center" },
  horizontalView: { flexDirection: 'row' },
  verticalView: {flexDirection: "column"},
  centerView: { flex: 1, justifyContent: "center", alignItems: "center" },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
});

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
      nutrientsSuppliedLabel: [[Nutrients1, Nutrients2]],
      gradeData: [["Recommendation","N", "P", "K", "N", "P", "K", "Score"]],
      currentNValue: this.props.navigation.state.params.currentNValue,
      solutions: this.props.navigation.state.params.solutions,
      output: this.props.navigation.state.params.output,
      filter: null,
      top: null, 

    }
  }

  scoreHigher = () =>{
    this.state.output = []
     this.state.solutions.filter((value, ind, arr) => (ind < this.state.top) && (arr[ind][7] >= this.state.filter))
     .forEach(value => this.state.output.push(value))
     this.setState({
       output: this.state.output
     }) 
  
   
  }

  render() {
    const state = this.state;
    return (
      <Container>
        <Content style={{backgroundColor: "#fff1d6"}}>
        {/* <Header>
          <Body>
            <Title>Second Home</Title>
          </Body>
        </Header> */}
        <View style = {[styles.verticalView, styles.centerView]}>

        <View style ={styles.horizontalView}>
            <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 50, width: '60%', textAlign: "center", marginBottom: 5 }}
              placeholder="Show Number of Scores "
              keyboardType="numeric"
              multiline={false}
              onChangeText={numberOfScores => {
               this.setState({top: +numberOfScores}, ()=>{this.scoreHigher()})
          
              }}
            />
            </View>

            <View style ={styles.horizontalView}>
            <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 50, width: '60%', textAlign: "center", marginBottom: 5 }}
              placeholder="Show Scores Higher Than "
              keyboardType="numeric"
              multiline={false}
              onChangeText={score => {
               this.setState({filter: +score}, ()=>{this.scoreHigher()})
              }}
            />
            </View>

            {/* <Button  onPress={() => {
              this.scoreHigher(state.filter, state.top)
            }}>
              <Text> Show</Text>
            </Button> */}

            </View>

        <View>            
            <Table borderStyle = {{borderWidth: 1}}>
              <Rows data={state.nutrientsSuppliedLabel} style={styles.head} textStyle={styles.text} />
              <TableWrapper>
              <Rows data={state.gradeData} style={styles.head} flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
              </TableWrapper>
              <TableWrapper>
                <Rows data={state.output}flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
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

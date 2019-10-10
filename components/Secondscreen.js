/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { TextInput, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Form, Item, Input, ListItem, Title, CheckBox, Body, Icon, Text, Picker, Button, Footer, FooterTab } from "native-base";

export default class SecondScreen extends Component {
  static navigationOptions = {
    title: "Output Screen"
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
      arrayofValue: this.props.navigation.state.params.arrayofValue,
      

    }
  }

  render() {
    const state = this.state;
    return (
      <Container>
        <Content>
        {/* <Header>
          <Body>
            <Title>Second Home</Title>
          </Body>
        </Header> */}
        <View>            
            <Table>
              <Rows data={state.nutrientsSuppliedLabel} textStyle={styles.text} />
              <TableWrapper>
              <Rows data={state.gradeData} style={styles.head} flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
              </TableWrapper>
              <TableWrapper>
                <Rows data={state.arrayofValue}flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
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
  centerView: { flex: 1, justifyContent: "center", alignContent: "center" },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
});

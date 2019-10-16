/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { TextInput, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Form, Item, Input, ListItem, Title, Body, Icon, Text, Picker, Button, Footer, FooterTab, CheckBox} from "native-base";
import { calculateIndividualScore, supplied, solve } from "./Functions/Helper.js";
import { StackGestureContext } from "react-navigation-stack";


export default class MainScreen extends Component {
  static navigationOptions = {
    title: "Input Screen",
    //  header: null
  }
  constructor(props) {
    super(props);

    this.state = { //You use inside the render, vars, and functions, but never for other states inside this body
      checked: false,

      grades: [],
      grades2: [],
      grades3: [],
      gradesParsed: [],
      solutions: [],
      output: [],

      currentNValue: 0,
      currentPValue: 0,
      currentKValue: 0,
      currentArea: 1000,
      calculatedValue: [[0, 0, 0]],

      defaultUnits: "Pounds-Square Feet",
      poundsOrOunces: "",
      sfOrAcres: "",
      tempFactor: 0,
      

    }

  }//state

  checkBoxGrade = (props) => {
    const state = this.state
     const checkBoxGradeTable = [ //make sure all components are close together
       [<View><CheckBox checked={state.checked}/><Text style={{textAlign: "center"}}>29-0-5</Text></View>,
       <View><CheckBox checked={state.checked}/><Text style={{textAlign:"center"}}>32-0-8</Text></View>,
       <View><CheckBox checked={state.checked}/><Text style={{textAlign:"center"}}>0-10-10</Text></View>,
       <View><CheckBox checked={state.checked}/><Text style={{textAlign:"center"}}>18-0-3</Text></View>,
       <View><CheckBox checked={state.checked}/><Text style={{textAlign:"center"}}>13-0-0</Text></View>
      ],
      [<View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
        <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
        <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
        <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
        <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>
      ],
      [<View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
          <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
          <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
          <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
          <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>
        ],
        [
          <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>
          ],
          [<View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>,
            <View><CheckBox/><Text style={{textAlign: "center"}}>10-10-10</Text></View>],

      ]
    return (
      <Table borderStyle={{borderWidth: 1}}>
      <TableWrapper>
      <Rows data={checkBoxGradeTable} style={styles.row} textStyle={styles.text} flexArr={[5,5,5,5,5]} />
      </TableWrapper>
    </Table>
    

    )
  }

  unCheckValues() {
    this.setState({
      gradeTenChecked: false,
      gradeFifteenChecked: false,
      gradeZeroTenChecked: false,
      gradeFiveChecked: false,
      userDefineCheck: false,
    })
  }
  //Update value of acre amount
  updateAcreValue(inputtedValue) {
    this.setState(
      {
        currentArea: inputtedValue
      },
      () => {
        this.calculateAcreValue();

      }
    );
  }

  selectAll() {
    this.state.grades2.push("10-10-10")
    this.state.grades2.push("5-5-5")
    this.state.grades2.push("0-10-10")

    this.setState({
      gradeTenChecked: true,
      gradeFiveChecked: true,
      gradeZeroChecked: true,
    })
  }

  clearAll() {
    // this.state.grades = []
    // state.solutions = []
    //     this.state.output = null
    this.setState({
      condition: false,
      output: null,
      grades3: [],
      grades2: [],
      gradeTenChecked: false,
      gradeFiveChecked: false,
      gradeZeroChecked: false,
    })
  }

  //Calculate values relating to pounds per square feet
  calculateAcreValue() {
    let selectedUnits = this.state.defaultUnits.split("-");
    let poundsOrOunces = selectedUnits[0];
    let sfOrAcres = selectedUnits[1];
    let factor = 0;
    if (poundsOrOunces == "Pounds" && sfOrAcres == "Square Feet") {
      factor = 43560 / +this.state.currentArea;

    } else if (poundsOrOunces == "Pounds" && sfOrAcres == "Acre") {
      factor = 1 / +this.state.currentArea;


    } else if (poundsOrOunces == "Ounces" && sfOrAcres == "Square Feet") {
      factor = (0.0625 * 43560) / this.state.currentArea;

    } else if (poundsOrOunces == "Ounces" && sfOrAcres == "Acre") {
      factor = 0.0625 / this.state.currentArea;

    } else {
      factor = "Error";
    }
    this.setState({
      poundsOrOunces: poundsOrOunces,
      sfOrAcres: sfOrAcres,
      tempFactor: factor,
      calculatedValue: [[(this.state.currentNValue / factor).toFixed(2), (this.state.currentPValue / factor).toFixed(2), (this.state.currentKValue / factor).toFixed(2)]]
    });
  }

  

  parseMe = (grade) => {
    this.state.gradesParsed = [] //if this isn't here then the grades will be duplicated 
    grade.forEach(element => {
      this.state.gradesParsed.push(element.split('-')) //an array of arrays

    })
    let factor = 0,
      num = {
        N: 0,
        P: 1,
        K: 2,
      },
      rec = {
        N: this.state.currentNValue,
        P: this.state.currentPValue,
        K: this.state.currentKValue,
      },
      unit = this.state.poundsOrOunces,
      sfoA = this.state.sfOrAcres,
      label = "Recommendation"
      N = 0,
      P = 0,
      K = 0,
      N1 = 0,
      P1 = 0,
      K1 = 0,
      this.state.solutions = [],
      score = 0,
      area = this.state.currentArea + " " + sfoA

    if (unit == "Pounds" && sfoA == "Square Feet") {
      factor = 43560 / +this.state.currentArea;

    } else if (unit == "Pounds" && sfoA == "Acre") {
      factor = 1 / +this.state.currentArea;


    } else if (unit == "Ounces" && sfoA == "Square Feet") {
      factor = (0.0625 * 43560) / this.state.currentArea;

    } else if (unit == "Ounces" && sfoA == "Acre") {
      factor = 0.0625 / this.state.currentArea;

    } else {
      factor = "Error";
    }

    const changeColor = (number) => {
      if (number < 0) {
        return <Text style={{ color: 'red', textAlign: "center" }}> {(-number).toFixed(2)}</Text>
      }
      else if (number == 0) {
        return <Text style={{ color: 'green', textAlign: "center" }}> {number.toFixed(2)}</Text>
      }
      else {
        return <Text style={{ color: 'blue', textAlign: "center" }}> {number.toFixed(2)}</Text>
      }
    }

    const solve = (matrix, freeTerms) => { //function works
      if (matrix.length == 1) {
        return [freeTerms[0] / matrix[0]];
      } else if (matrix.length == 2) {
        let [[a1, b1], [a2, b2]] = matrix,
          [c1, c2] = freeTerms,
          D = a1 * b2 - b1 * a2,
          x = (c1 * b2 - b1 * c2) / D,
          y = (a1 * c2 - c1 * a2) / D;

        return [x, y];
      } else if (matrix.length == 3) {
        let [[a, b, c], [l, m, n], [p, q, r]] = matrix,
          [d, k, s] = freeTerms.map(v => -v),
          D = (a * m * r + b * p * n + c * l * q) - (a * n * q + b * l * r + c * m * p),
          x = ((b * r * k + c * m * s + d * n * q) - (b * n * s + c * q * k + d * m * r)) / D,
          y = ((a * n * s + c * p * k + d * l * r) - (a * r * k + c * l * s + d * n * p)) / D,
          z = ((a * q * k + b * l * s + d * m * p) - (a * m * s + b * p * k + d * l * q)) / D;

        return [x, y, z];
      }
    } // solve
    const rpd = (v1, v2) => { //function works
      return Math.abs(v1 - v2) / ((+v1 + +v2) / 2);
    };
    const calcScore = (sn, sp, sk) => { //function works
      let sc;

      if (sn + sp + sk == 0) {
        return 0;
      }
      sc = 100;

      if (rec.N > 0 && sn == 0) {
        sc -= 25;
      } else if (rec.N > 0 && (sn < 0.9 * rec.N || sn > 1.1 * rec.N)) {
        sc -= 10 * rpd(sn, rec.N);
      } else {
        sc -= 5 * rpd(sn, rec.N);
      }

      if (rec.P > 0 && sp == 0) {
        sc -= 25;
      } else if (sp > rec.P * 1.05) {
        sc -= 20 * rpd(sp, rec.P);
      } else {
        sc -= 10 * rpd(sp, rec.P);
      }

      if (rec.K > 0 && sk == 0) {
        sc -= 25;
      } else if (sk < rec.K) {
        sc -= 20 * rpd(sk, rec.K);
      } else {
        sc -= 10 * rpd(sk, rec.K);
      }

      return sc ? Math.min(100, Math.max(0, sc)).toFixed(0) : 0;
    } // calcSore

    const match = (parms, grades) => {
      // console.log(parms) //works
      let supplied = {
        N: 0,
        P: 0,
        K: 0,
      },
        sd = {
          N: rec.N,
          P: rec.P,
          K: rec.K
        },
        terms = parms.map(parm => rec[parm]),
        matrix = parms.map((parm, i) => grades.map((grade, j) => grades[j][num[parm]])),
        cr = solve(matrix, terms);

      // console.log("CR: " + cr) //works
      // console.log("TERMS: " + terms) //works
      // console.log("UNIT: " + unit) //works
      // console.log("AREA: " + area) //works


      // console.log("N value: " + rec.N) //works
      // console.log("P value: " + rec.P) //works
      // console.log("K value: " + rec.K) //works

      if (cr.every(e => e >= 0 && e < Infinity)) {
        cr.forEach((amt, i) => {
          supplied.N += amt * grades[i][0]; //N
          supplied.P += amt * grades[i][1]; //P
          supplied.K += amt * grades[i][2]; //K
        });

        let s = cr.filter(amt => amt > 0)
          .map((amt, i) => `${(amt * 100 / factor).toFixed(2)} ${unit} of ${grades[i].join('-')}`).join(' plus\n')

        label = `${s} per ${area}`
        N1 = (supplied.N / factor).toFixed(2)
        P1 = (supplied.P / factor).toFixed(2)
        K1 = (supplied.K / factor).toFixed(2)
        N = ((supplied.N - rec.N) / factor)
        P = ((supplied.P - rec.P) / factor)
        K = ((supplied.K - rec.K) / factor)
        score = calcScore(supplied.N, supplied.P, supplied.K)


        this.state.output = []


        this.state.solutions.push([label, N1, P1, K1, changeColor(N), changeColor(P), changeColor(K), score])
        this.state.solutions.sort(function (a, b) { return b[7] - a[7] }) //sorts based on score
        this.state.solutions.forEach(element => {
          this.state.output.push(element) //array of arrays

        })

      }

      console.log("SOLUTION: " + JSON.stringify(this.state.solutions))
      console.log("SOLUTION LENGTH: " + this.state.solutions.length)
      console.log("Supplied N: " + supplied.N) //works
      console.log("Supplied P: " + supplied.P) // works
      console.log("Supplied K: " + supplied.K) //works
    } // match

    // console.log("my grades: " + gradesParsed) //works
    // console.log("my grades length: " + gradesParsed.length) //works
    console.log(JSON.stringify(this.state.gradesParsed)) //works

    for (let i = 0; i < this.state.gradesParsed.length; i++) {
      //console.log("first loop: " + gradesParsed[i])//works
      match(['N'], [this.state.gradesParsed[i]]);
      match(['P'], [this.state.gradesParsed[i]]);
      match(['K'], [this.state.gradesParsed[i]]);

      for (let j = i + 1; j < this.state.gradesParsed.length; j++) {
        // console.log("second loop" + gradesParsed[j]) //works
        match(['N', 'P'], [this.state.gradesParsed[i], this.state.gradesParsed[j]]);
        match(['N', 'K'], [this.state.gradesParsed[i], this.state.gradesParsed[j]]);
        match(['P', 'K'], [this.state.gradesParsed[i], this.state.gradesParsed[j]]);

        for (let k = j + 1; k < this.state.gradesParsed.length; k++) {
          //console.log("third loop" + gradesParsed[k]) //works
          match(['N', 'P', 'K'], [this.state.gradesParsed[i], this.state.gradesParsed[j], this.state.gradesParsed[k]]);
        }
      }
    }

  }//parseMe

render() {
    const state = this.state;

    return (
      <Container >
        <Content style={{backgroundColor: "#fff1d6"}}>
          <View style={[styles.horizontalView, styles.wrapper]}>
            <View style={[styles.horizontalView, styles.centerView]}>
              <Text style={{ fontSize: 20 }}> N: </Text>
              <TextInput
                editable={true}
                style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%' }}
                keyboardType="numeric"
                placeholder="Enter N value"
                onChangeText={inputtedValue => {
                  this.setState({ currentNValue: inputtedValue },()=> this.calculateAcreValue())
                }}
              />
            </View>

            <View style={[styles.horizontalView, styles.centerView]}>
              <Text style={{ fontSize: 20 }}> P: </Text>
              <TextInput
                editable={true}
                keyboardType="numeric"
                style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%' }}
                placeholder="Enter P value"
                onChangeText={inputtedValue => {
                  this.setState({ currentPValue: inputtedValue },()=> this.calculateAcreValue());
                }}
              />
            </View>

            <View style={[styles.horizontalView, styles.centerView]}>
              <Text style={{ fontSize: 20 }}> K: </Text>
              <TextInput
                editable={true}
                keyboardType="numeric"
                style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%' }}
                placeholder="Enter K value"
                onChangeText={inputtedValue => {
                  this.setState({ currentKValue: inputtedValue }, ()=>this.calculateAcreValue())
                }}
              />
            </View>
          </View>
          <Picker
            enabled={true}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={state.defaultUnits}
            placeholder={state.defaultUnits}
            onValueChange={value => {
              this.setState({ defaultUnits: value }, () => {
                this.calculateAcreValue(); //when value is changed callback function initiates 

              });
            }}
          >
            <Picker.Item label="Pounds - Square Feet" value="Pounds-Square Feet" />
            <Picker.Item label="Pounds - Acre" value="Pounds-Acre" />
            <Picker.Item label="Ounces - Square Feet" value="Ounces-Square Feet" />
            <Picker.Item label="Ounces - Acre" value="Ounces-Acre" />
          </Picker>

          <TextInput
            style={{ fontSize: 20, height: 50, textAlign: "center", borderBottomColor: "#42bcf5", borderBottomWidth: 1 }}
            placeholder="Enter value per acre"
            keyboardType="numeric"
            defaultValue = "1000"
            onChangeText={inputtedValue => {
              this.setState({
                currentArea: inputtedValue
              },()=>this.calculateAcreValue()
              )
            }} />
          <View>
            <Table>
              <Rows data={state.calculatedValue} textStyle={styles.text} />
            </Table>
          </View>

          <this.checkBoxGrade/>

          {/* <ListItem>
            <CheckBox checked={state.gradeTenChecked}
              onPress={() => {
                this.setState({ gradeTenChecked: !this.state.gradeTenChecked },
                  () => {
                    if (state.gradeTenChecked == false) {
                      // alert("True")
                      state.grades2.push("10-10-10")
                      this.parseMe(state.grades2)

                    } else {

                      let index = state.grades2.indexOf("10-10-10")
                      if (index > -1) {
                        state.grades2.splice(index, 1)
                        this.parseMe(state.grades2)
                      }
                      //alert("false")
                    }
                  })

              }}
            />
            <Body>
              <Text> 10-10-10</Text>
            </Body>
            <CheckBox checked={state.gradeFiveChecked}
              onPress={() => {
                this.setState({ gradeFiveChecked: !this.state.gradeFiveChecked },
                  () => {
                    if (state.gradeFiveChecked == false) {
                      //  alert("True")
                      state.grades2.push("5-5-5")
                      this.parseMe(state.grades2)

                    } else {
                      //alert("false")
                      let index = state.grades2.indexOf("5-5-5")
                      let index1 = state.grades3.indexOf("5-5-5")
                      if (index > -1 || index1 > -1) {
                        state.grades2.splice(index, 1)
                        state.grades3.splice(index1, 1)
                        this.parseMe(state.grades2)
                        this.parseMe(state.grades3)
                      }
                    }

                  })


              }} />
            <Body>
              <Text> 5-5-5</Text>
            </Body>
            <CheckBox checked={state.gradeZeroChecked}
              onPress={() => {
                this.setState({ gradeZeroChecked: !this.state.gradeZeroChecked },
                  () => {
                    if (state.gradeZeroChecked == false) {
                      // alert("True")
                      state.grades2.push("0-10-10")
                      this.parseMe(state.grades2)

                    } else {
                      //   alert("false")
                      let index = state.grades2.indexOf("0-10-10")
                      if (index > -1) {
                        state.grades2.splice(index, 1)
                        this.parseMe(state.grades2)
                      }
                    }
                  })
              }} />
            <Body>
              <Text> 0-10-10</Text>
            </Body>

          </ListItem> */}

          <View style={[styles.horizontalView, { margin: 30 }, styles.centerView]}>

            <Button onPress={() => {
              // alert(JSON.stringify(state.grades))
              this.selectAll()
            }}>
              <Text> Select All</Text>
            </Button>

            <Button style={{ marginLeft: 5 }} onPress={() => {
              this.clearAll()
            }}>
              <Text> Clear All</Text>
            </Button>
          </View>


          <View style={[styles.verticalView, styles.centerView, styles.wrapper]}>

            <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 300, width: '50%', textAlign: "center" }}
              placeholder="Enter Grades"
              keyboardType="default"
              multiline={true}
              onChangeText={user => {
                // state.grades = [] //works with or without (keep)
                state.grades = user.trim().split(/\s+/)
                // this.setState({ grades: user.trim().split(/\s+/) }) //split creates an array for me. So userInput is my array
              }}
            />
            <Button style={{ margin: 30 }} onPress={() => {
              state.grades3 = []
              state.grades3 = state.grades2.concat(state.grades)
              this.parseMe(state.grades3);
              this.props.navigation.navigate("SecondScreen", { output: state.output, solutions: state.solutions, calculatedValue: state.calculatedValue })

            }}>
              <Text > Calculate</Text>
            </Button>
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="calculator" />
            </Button>
            <Button>
              <Icon name="pulse" onPress={
                () => this.props.navigation.navigate("SecondScreen", { output: state.output, solutions: state.solutions, calculatedValue: state.calculatedValue })} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: { height: 50, backgroundColor: "#f1f8ff" },
  text: { margin: 2, textAlign: "center" },
  horizontalView: { flexDirection: 'row' },
  verticalView: { flexDirection: "column" },
  centerView: { flex: 1, justifyContent: "center", alignItems: "center" },
  wrapper: { justifyContent: 'space-around' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
});

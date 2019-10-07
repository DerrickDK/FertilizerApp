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
import { rpd, calculateIndividualScore, supplied, solve } from "./Functions/Helper.js";

const grades = []
var gradesParsed = []
const solutions = []
const results = []
export default class MainScreen extends Component {
  static navigationOptions = {
   title: "Input Screen",
  //  header: null
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
    this.state = { //You use inside the render, vars, and functions, but never for other states inside this body
      userDefineCheck: false,
      gradeTenChecked: false,
      gradeZeroTenChecked: false,
      gradeFiveChecked: false,
      gradeFifteenChecked: false,
      userInput: null,
      
      arrayofValue: [], 
      arrayofValue1: [],

      currentNValue: 60,
      currentPValue: 80,
      currentKValue: 100,
     
      caclulatedValue: [[0, 0, 0]],
      nutrientsSuppliedLabel: [[Nutrients1, Nutrients2]],
      gradeData: [["Recommendation","N", "P", "K", "N", "P", "K", "Score"]],
      

      defaultUnits: "Pounds-Square Feet",
      poundsOrOunces: "",
      sfOrAcres: "",
      tempFactor: 0,
      currentArea: 1000,

      nResult: 0,
      pResult: 0,
      kResult: 0,

      nArea: 0,
      pArea: 0,
      kArea: 0,
    
      selectedGrade: [],
      fullGrade: "",

      matchN: 0,
      matchP: 0,
      matchK: 0,

      suppliedNum1: 0,
      suppliedNum2: 0,
      suppliedNum3: 0,

      suppliedNum4: 0,
      suppliedNum5: 0,
      suppliedNum6: 0,

      suppliedNum7: 0,
      suppliedNum8: 0,
      suppliedNum9: 0,

      score1: 0,
      score2: 0,
      score3: 0,

      nlabel: null,
      kLabel: null, 
      pLabel: null,

      nValues: null,
      pValues: null,
      kValues: null, 
    };
    
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

  //Update value of N
  updateNValue(value) {
    this.setState(
      {
        currentNValue: value
      }
    );
  }

  //Update value of P
  updatePValue(value) {
    this.setState(
      {
        currentPValue: value
      }
    );
  }

  //Update value of K
  updateKValue(value) {
    this.setState(
      {
        currentKValue: value
      }
    );
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
      nResult: this.state.currentNValue / factor, //N 
      pResult: this.state.currentPValue / factor, //P
      kResult: this.state.currentKValue / factor, //K

      caclulatedValue: [[(this.state.currentNValue / factor).toFixed(2), (this.state.currentPValue / factor).toFixed(2), (this.state.currentKValue / factor).toFixed(2)]]
    });
  }

  parseMe(grade){
    grade.forEach(element => {gradesParsed.push(element.split('-'))})

  }

  //Gets values from selected grade
  parseGradeAndMatchGrade(grade) {
    

    /*
      Split the selected grades
      Ex: 10-10-10 will become
      gradeOne = 10
      gradeTwo = 10
      gradeThree = 10
    */
    this.state.selectedGrade = grade.split("-");

    let gradeOne = (+this.state.selectedGrade[0]);
    let gradeTwo = (+this.state.selectedGrade[1]);
    let gradeThree = (+this.state.selectedGrade[2]);



    // let testIF = () => {
    //   if(gradeOne) {
    //     return Math.ceil((this.state.currentNValue)/gradeOne) * 100;
    //   } else { return 0 }
    // }


    let matchN = gradeOne ? Math.ceil((this.state.currentNValue / gradeOne) * 100) : 0; // (60/10)*100 => 600
    let matchP = gradeTwo ? Math.ceil((this.state.currentPValue / gradeTwo) * 100) : 0;
    let matchK = gradeThree ? Math.ceil((this.state.currentKValue / gradeThree) * 100) : 0;

    //as soon as you set the state, run the function after
    this.setState(
      {
        fullGrade: grade,
        matchN: matchN, //gradeOne
        matchP: matchP, //gradeTwo
        matchK: matchK //gradeThree
      },
      () => {
        this.calculateScore(grade); //use fullgrade to calculate score
 
      }
    );
  }

  //Score takes the full grade with (Ex 10-10-10)
  calculateScore(grade) {
    this.setState(
      {
        suppliedNum1: supplied(+this.state.matchN, +this.state.selectedGrade[0]),// 600, 10 //supplied is a helper function (600 *10)/100 = 60
        suppliedNum2: supplied(+this.state.matchN, +this.state.selectedGrade[1]),
        suppliedNum3: supplied(+this.state.matchN, +this.state.selectedGrade[2]),

        suppliedNum4: supplied(+this.state.matchP, +this.state.selectedGrade[0]),
        suppliedNum5: supplied(+this.state.matchP, +this.state.selectedGrade[1]),
        suppliedNum6: supplied(+this.state.matchP, +this.state.selectedGrade[2]),

        suppliedNum7: supplied(+this.state.matchK, +this.state.selectedGrade[0]),
        suppliedNum8: supplied(+this.state.matchK, +this.state.selectedGrade[1]),
        suppliedNum9: supplied(+this.state.matchK, +this.state.selectedGrade[2])
      },
      () => {
        this.calculateFinalScore(grade);

      }
    );
  }

  //Calculates final scores based on parameters
  calculateFinalScore(grade) { // 10-10-10
    this.setState(
      {
        //score1 visual: 60,60,60, 60, 80, 100
        score1: calculateIndividualScore(this.state.suppliedNum1, this.state.suppliedNum2, this.state.suppliedNum3, +this.state.currentNValue, +this.state.currentPValue, +this.state.currentKValue), //score for all N
        score2: calculateIndividualScore(this.state.suppliedNum4, this.state.suppliedNum5, this.state.suppliedNum6, +this.state.currentNValue, +this.state.currentPValue, +this.state.currentKValue), //score for all P
        score3: calculateIndividualScore(this.state.suppliedNum7, this.state.suppliedNum8, this.state.suppliedNum9, +this.state.currentNValue, +this.state.currentPValue, +this.state.currentKValue) //score for all K
      },
      () => {
        this.calculateValues(grade);

      }
    );
  }


  //Calculating values relating to each row of data and storing into array
  calculateValues(grade) {
    let nResult = this.state.nResult;  //# 60
    let pResult = this.state.pResult; //# 80
    let kResult = this.state.kResult; //# 100

    this.state.nArea = ((nResult / this.state.selectedGrade[0]) * 100).toFixed(2); //label1
    this.state.pArea = ((pResult / this.state.selectedGrade[1]) * 100).toFixed(2); //label2
    this.state.kArea = ((kResult / this.state.selectedGrade[2]) * 100).toFixed(2);//label3

    //nsd = Nutrients Surplus or Deficit
    let NSD1 = nResult - nResult;
    let PSD1 = nResult - pResult;
    let KSD1 = nResult - kResult;

    let NSD2 = pResult - nResult;
    let PSD2 = pResult - pResult;
    let KSD2 = pResult - kResult;

    let NSD3 = kResult - nResult;
    let PSD3 = kResult - pResult;
    let KSD3 = kResult - kResult;


    const changeMyColorPlease = (number) => {
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

  
    if (grade == "10-10-10") {
      if (this.state.gradeTenChecked) {
    
        this.state.nlabel = ["Apply " + this.state.nArea + " " + this.state.poundsOrOunces + " of " + this.state.fullGrade + " per " + this.state.currentArea + " " + this.state.sfOrAcres];
        this.state.nValues = [this.state.nlabel, this.state.nResult.toFixed(2), this.state.nResult.toFixed(2), this.state.nResult.toFixed(2), changeMyColorPlease(NSD1), changeMyColorPlease(PSD1), changeMyColorPlease(KSD1), this.state.score1];

        this.state.pLabel = ["Apply " + this.state.pArea + " " + this.state.poundsOrOunces + " of " + this.state.fullGrade + " per " + this.state.currentArea + " " + this.state.sfOrAcres];
        this.state.pValues = [this.state.pLabel, this.state.pResult.toFixed(2), this.state.pResult.toFixed(2), this.state.pResult.toFixed(2), changeMyColorPlease(NSD2), changeMyColorPlease(PSD2), changeMyColorPlease(KSD2), this.state.score2];
        
        this.state.kLabel = ["Apply " + this.state.kArea + " " + this.state.poundsOrOunces + " of " + this.state.fullGrade + " per " + this.state.currentArea + " " + this.state.sfOrAcres];
        this.state.kValues = [this.state.kLabel, this.state.kResult.toFixed(2), this.state.kResult.toFixed(2), this.state.kResult.toFixed(2), changeMyColorPlease(NSD3), changeMyColorPlease(PSD3), changeMyColorPlease(KSD3), this.state.score3 - 1];   
        
        // this.state.arrayofValue.push(this.state.nValues, this.state.pValues, this.state.kValues)
        // this.state.arrayofValue.sort(function(a,b){return b[7]-a[7]})
        
      
        this.state.arrayofValue1.push(this.state.nValues, this.state.pValues, this.state.kValues)
        this.state.arrayofValue1.sort(function(a,b){return b[7]-a[7]})
        
        this.setState({
          arrayofValue: this.state.arrayofValue1,
        })
    
      } 
    }
  }

  


  unCheckValues(){
    this.setState({
      gradeTenChecked: false, 
      gradeFifteenChecked: false, 
      gradeZeroTenChecked: false,
      gradeFiveChecked:false,
      userDefineCheck: false,
    })
  }
  userDefineCheckFunction(){
    this.setState({
      userDefineCheck: !this.state.userDefineCheck
    });
  }

  render() {
    const state = this.state;
  
    return (
      <Container>
        <Content>
        {/* <Header>
          <Body>
            <Title>Fertilizer Calculator</Title>
          </Body>
        </Header> */}
        
        
        <ListItem style={styles.centerView}>
        
        <CheckBox checked={state.userDefineCheck} 
        onPress={() => {this.setState({userDefineCheck: !this.state.userDefineCheck},
        ()=>{this.parseGradeAndMatchGrade(state.userInput); if(this.state.userDefineCheck == false){this.clearValues()}})}} />
        <TextInput
              style={{ borderColor: "#42bcf5", borderWidth: 1, fontSize: 20, height: 50, width: '50%', textAlign: "center"}}
              placeholder="Enter Grade"
              keyboardType="default"
              multiline = {true}
              onChangeText={user => {
                this.setState({userInput: user})
              }} />
              <Button onPress ={()=> alert(helloWorld)}>
                <Text> Get</Text>
              </Button>
            
            </ListItem>



        
          <ListItem>
            <CheckBox checked = {state.gradeTenChecked} 
            onPress={() => {this.setState({gradeTenChecked: !this.state.gradeTenChecked},
            ()=>{this.parseGradeAndMatchGrade("10-10-10");})}} />
            <Body>
              <Text> 10-10-10</Text>
            </Body>
          </ListItem>
          
        

        


          <View style={[styles.horizontalView, styles.centerView]}>
            <Text style={{ fontSize: 20}}> N: </Text>
            <TextInput
              editable={true}
              style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%' }}
              keyboardType="numeric"
              placeholder="Enter N value"
              onChangeText={inputtedValue => {
                this.updateNValue(inputtedValue);
              }}
            />
          </View>

          <View style={[styles.horizontalView, styles.centerView]}>
            <Text style={{ fontSize: 20}}> P: </Text>
            <TextInput
              editable={true}
              keyboardType="numeric"
              style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%' }}
              placeholder="Enter P value"
              onChangeText={inputtedValue => {
                this.updatePValue(inputtedValue); 
              }}
            />
          </View>

          <View style={[styles.horizontalView, styles.centerView]}>
            <Text style={{ fontSize: 20}}> K: </Text>
            <TextInput
              editable={true}
              keyboardType="numeric"
              style={{ borderBottomColor: "#42bcf5", borderBottomWidth: 1, fontSize: 20, height: 50, width: '50%'}}
              placeholder="Enter K value"
              onChangeText={inputtedValue => {
                this.updateKValue(inputtedValue); 
              }}
            />
          </View>

      
            <Picker
              enabled={true}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={state.defaultUnits}
              placeholder={state.defaultUnits}
              onValueChange={value => {
                this.setState({ defaultUnits: value }, () => {
                  this.calculateAcreValue(); 
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
              onChangeText={inputtedValue => {
                this.updateAcreValue(inputtedValue); 
              }} />


          {/* <View>
            
            <Table>
              <Rows data={state.caclulatedValue} textStyle={styles.text} />
              <Rows data={state.nutrientsSuppliedLabel} textStyle={styles.text} />
              <TableWrapper>
              <Rows data={state.gradeData} style={styles.head} flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
              </TableWrapper>
              <TableWrapper>
                <Rows data={state.arrayofValue}flexArr={[3, 1, 1,1,1,1,1]} textStyle={styles.text} />
              </TableWrapper>
            </Table>

          </View> */}
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="calculator" />
            </Button>
            <Button>
              <Icon name="pulse" onPress = {() => this.props.navigation.navigate("SecondScreen")}/>
            </Button>
          </FooterTab>
        </Footer>
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

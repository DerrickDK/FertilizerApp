/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Form, Item, Input, ListItem, Text, Title, CheckBox, Body, Icon, Picker, Button, Footer, FooterTab } from "native-base";


export default class SecondScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
        <Header>
          <Body>
            <Title>Second Home</Title>
          </Body>
        </Header>

            <View> 
          <Text> Hello </Text>
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button>
              <Icon name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
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
  text: { margin: 6, textAlign: "center" },
  horizontalView: { flexDirection: 'row' },
  centerView: { flex: 1, justifyContent: "center", alignContent: "center" },
  wrapper: { flexDirection: 'row' },
  row: { height: 28 },
});

import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Body, Left, Right, Thumbnail, View, Container, ListItem, Text, Icon, List, Badge, Fab } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import styles from './lectureStyles';
import rest from '../../utils/rest';

import placeHolder from '../../../images/ic_unknownxxhdpi.png';

const mapStateToProps = state => ({
  lectures: state.lectures.data,
  loading: state.lectures.loading,
  isLoggedIn: !!state.login.token,
});
const mapDispatchToProps = dispatch => ({
  getLectures: () => dispatch(rest.actions.lectures()),
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LecturesView extends Component {
  static navigationOptions = {
    title: 'My lectures',
    tabBar: () => ({
      icon: ({ tintColor: color }) => (
        <Icon name="ios-list" style={{ color }} />
      ),
      visible: true,
    }),
  };

  componentDidMount() {
    this.props.getLectures();
  };

  open = (routeName, lectureId) => {
    const { navigate } = this.props;
    navigate({ routeName, params: { lectureId } });
  };

  renderRow = lecture => (
    <ListItem button onPress={() => this.open('LectureDetails', lecture.id)} avatar key={lecture.id}>
      <Left>
        <Thumbnail source={{ uri: lecture.expertImageUrl }} />
      </Left>
      <Body>
        <Text>{lecture.title}</Text>
        <Text note>{lecture.expertName}</Text>
        <Text note>{new Date(lecture.dateOption1).toLocaleDateString('fi-FI')}</Text>
        <Badge style={styles[lecture.status]}>
          <Text style={{ fontSize: 10 }}>{lecture.status.toUpperCase()}</Text>
        </Badge>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );

  renderPlaceholder = (lectures) => {
    if (lectures.length == 0) {
      return (
        <Container>
          <View style={ styles.placeholderBody }>
            <Text style={styles.placeholderHeader}> Welcome to XPRT! </Text>
            <Text style={styles.placeholderText}> 
                  Arranging a visiting lecture from a professional expert has become easier.
                  {'\n'}
                  {'\n'}
                  Click the green button to create your first lecture and invite an expert!
            </Text> 
          </View>
        </Container>
      );
    };
  };

  render() {
    const { lectures, loading, getLectures } = this.props;

    return (
      <Container>
        <View style={{ flex: 1 }}>
          {this.renderPlaceholder(lectures)}
          <List
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getLectures}
              />
            }
            dataArray={lectures}
            renderRow={this.renderRow}

          />
        </View>
        <Fab
          position="bottomRight"
          style={styles.xprtGreen}
          onPress={() => this.open('LectureInvitation')}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

// import React, {useEffect} from 'react';
// import {View, StyleSheet, TextInput, Button} from 'react-native';
// import Input from '../../components/ui/Input';
// import {useDispatch, useSelector} from 'react-redux';

// import * as authActions from '../../store/actions/auth';
// import Colors from '../../constants/Colors';
// import {isAuthenticated} from '../../store/selectors/auth';

// const HomeScreen = ({navigation}) => {
//   const dispatch = useDispatch();

//   return (
//     <View style={styles.container}>
//       <Input
//         placeholder="Enter Game Name"
//         onChangeText={(value) => this.onChangeText(value)}
//         style={styles.input}
//       />
//       <Button title="Confirm User" onPress={this.confirmUser.bind(this)} />
//     </View>
//   );
// };

// export const screenOptions = {
//   headerTitle: 'Create a game sceen',
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 50,
//     backgroundColor: '#ededed',
//     marginVertical: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });
// export default HomeScreen;

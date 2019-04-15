import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f9b529',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderBottomWidth: 0
    },
    headertext:{
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 14,
      },button:{
        backgroundColor: '#f9b529',
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '95%',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height:5},
        shadowOpacity: 0.1,
        shadowRadius: 10
    }, 
    buttonText:{
       textAlign: 'center',
       color: '#fff'
    }, 
    box:{
       padding: 5,
       width: '90%',
       backgroundColor: '#fff', 
       borderRadius: 5,
       alignItems:'center',
       shadowColor: '#000',
       shadowOffset: {width: 0, height:5},
       shadowOpacity: 0.1,
       shadowRadius: 5
    }
});
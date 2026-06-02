import {Button, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 40,
  },

  etiqueta: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entrada: {
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF3D00',
    marginBottom: 20,
    padding: 10,
    width: '80%',
    borderRadius: 5
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  Button: {
    backgroundColor: '#f32121',
    padding: 10,
  },
});
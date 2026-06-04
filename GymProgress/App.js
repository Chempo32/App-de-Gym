import { useState } from 'react';
import { Text, View, TextInput, SafeAreaView, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style/style_formulario';

export default function App() { 
  
  const [ejercicios, setEjercicios] = useState([
    { id: 1, nombre: 'Press de Banca', peso: 60, repeticiones: 10, nuevo_objetivo_repeticiones: 12 }
  ]);

  // Esta función recibe el nuevo arreglo completo
  const agregarejercicios = (nuevaListaDeEjercicios) => {
    setEjercicios(nuevaListaDeEjercicios);
  };

  const boton_registrar = async () => {
    if (!nombre || !peso || !repeticiones || !nuevo_objetivo_repeticiones) {
      Alert.alert('Faltan datos', 'Por favor, completa todos los campos guerrer@.');
      return;
    }
    
    const nuevalista = {
      id: new Date().getTime(),
      fecha: id_fecha_actual, 
      nombre, 
      peso, 
      repeticiones, 
      nuevo_objetivo_repeticiones
    };
    //Funcion para juntar el nuevo ejercicio con los anteriores, creando un nuevo arreglo completo
    const ejerciciosActualizados = [...ejercicios, nuevalista];

    agregarejercicios(ejerciciosActualizados);
    
    //Guardamos en la memoria del teléfono
    try {
      const jsonstring = JSON.stringify(ejerciciosActualizados); 
      await AsyncStorage.setItem('ejercicios', jsonstring); 
    } catch (error) {
      console.log('Hubo un error guardando en la memoria:', error);
    }

    guardarEjercicio();
  };
  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Text style={styles.titulo}>Ejercicio</Text>

        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput 
          style={styles.entrada}
          placeholder="Ej. Press de Banca"
          value={nombre}
          onChangeText={setNombre} 
        />

        <Text style={styles.etiqueta}>Peso (kg):</Text>
        <TextInput 
          style={styles.entrada}
          placeholder="Ej. 25"
          keyboardType="numeric" 
          value={peso}
          onChangeText={setPeso}
        />

        <Text style={styles.etiqueta}>Repeticiones:</Text>
        <TextInput 
          style={styles.entrada}
          placeholder="Ej. 10"
          keyboardType="numeric"
          value={repeticiones}
          onChangeText={setRepeticiones}
        />

        <Text style={styles.etiqueta}>Objetivo Nuevo:</Text>
        <TextInput 
          style={styles.entrada}
          placeholder="Ej. 10"
          keyboardType="numeric"
          value={nuevo_objetivo_repeticiones}
          onChangeText={setNuevo_Objetivo_Repeticiones}
        />
        
        <View style={{ marginTop: 20, marginBottom: 30, width: '80%' }}>
          <Button 
            title="Registrar Ejercicio" 
            onPress={boton_registrar} 
          />
        </View>

        {/* 3. Regresamos la vista de la lista para que veas tus resultados */}
        <Text style={styles.titulo}>Tus Rutinas:</Text>
        
        {ejercicios.map((ejercicio) => (
          <View key={ejercicio.id} style={{ width: '90%', backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{ejercicio.nombre}</Text>
            <Text>Peso: {ejercicio.peso} kg | Reps: {ejercicio.repeticiones}</Text>
            <Text>Objetivo: {ejercicio.nuevo_objetivo_repeticiones}</Text>
            {ejercicio.fecha && <Text style={{ color: '#888', marginTop: 5 }}>Registrado: {ejercicio.fecha}</Text>}
          </View>
        ))}

      </ScrollView>  
    </SafeAreaView>
  );
}
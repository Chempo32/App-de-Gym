import { useState } from 'react';
import { Text, View, TextInput, SafeAreaView, ScrollView, Button, Alert } from 'react-native';
import { styles } from './style/style_formulario';

export default function App() { 
  
  const [ejercicios, setEjercicios] = useState([
    { id: 1, nombre: 'Press de Banca', peso: 60, repeticiones: 10, nuevo_objetivo_repeticiones: 12 }
  ]);

  const agregarejercicios = (nuevoEjercicio) => {
    setEjercicios([...ejercicios, nuevoEjercicio]);
  };

  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [nuevo_objetivo_repeticiones, setNuevo_Objetivo_Repeticiones] = useState('');
  
  const id_fecha_actual = new Date().toLocaleDateString();

  const boton_registrar = () => {
    if (!nombre || !peso || !repeticiones || !nuevo_objetivo_repeticiones) {
      Alert.alert('Faltan datos', 'Por favor, completa todos los campos guerrer@.');
      return;
    }
    
    // 1. Agregamos el "id" y nombramos correctamente la propiedad de la "fecha"
    const nuevalista = {
      id: new Date().getTime(),
      fecha: id_fecha_actual, 
      nombre, 
      peso, 
      repeticiones, 
      nuevo_objetivo_repeticiones
    };

    agregarejercicios(nuevalista);
    
    // 2. Corregimos el error de dedo aquí:
    guardarEjercicio();
  };

  function guardarEjercicio(){
    console.log('Se guardó correctamente el ejercicio');
    Alert.alert('¡Éxito!', '¡Ejercicio registrado con éxito!');
    
    setNombre('');
    setPeso('');
    setRepeticiones('');
    setNuevo_Objetivo_Repeticiones('');
  }

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
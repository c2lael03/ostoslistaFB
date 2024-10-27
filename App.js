// https://oulu.yuja.com/V/PlayList?node=3748690&a=262801758
// FIREBASE APP ohje

import { firestore, collection, addDoc } from './firebase/Config'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { deleteDoc, doc, getDocs } from "firebase/firestore"
import Icon from 'react-native-vector-icons/FontAwesome'


const addItem = async (name) => {
  await addDoc(collection(firestore, 'shoppingList'), { name });
};

const removeItem = async (itemId) => {
  await deleteDoc(doc(firestore, 'shoppingList', itemId));
};

const getShoppingList = async () => {
  const snapshot = await getDocs(collection(firestore, 'shoppingList'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const ShoppingListApp = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const fetchedItems = await getShoppingList();
    setItems(fetchedItems);
  };

  const handleAddItem = async () => {
    if (newItemName.trim()) {
      await addItem(newItemName);
      setNewItemName(''); 
      fetchItems();       
    }
  };

  const handleRemoveItem = async (itemId) => {
    await removeItem(itemId);
    fetchItems(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
       <Text style={styles.headerText}>Shopping List</Text>
      
      {/* Input for adding new item */}
      <View style={styles.inputContainer}>
        <TextInput
          value={newItemName}
          onChangeText={setNewItemName}
          placeholder="Add new item..."
          placeholderTextColor="#333"
          style={styles.input}
        />
        <Button title="Add" onPress={handleAddItem} />
      </View>

      {/* Display the shopping list */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.deleteButton}>
            <Icon name='trash' size={30} color="#000000" />
              <Text style={styles.deleteButtonText}></Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 25, 
    fontWeight: 'light',
    color: '#333',
    marginBottom: 15,
    //textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#fff', 
    fontSize: 14, 
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5, 
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 14, 
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#fff',
    paddingVertical: 4, 
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, 
  },
});

export default ShoppingListApp;

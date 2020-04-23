import React, { useState, useEffect } from "react"
import { StyleSheet, ScrollView, View, Text } from "react-native"
import Notification from "./components/Notification"
import Status from "./components/Status"
import Stat from "./components/Stat"
import { queryNotification } from "./api"

export default function App() {
  const [notification, updateNotification] = useState([])

  useEffect(() => {
    async function fetchNotification() {
      const res = await queryNotification()
      updateNotification(res.data.Data)
    }
    fetchNotification()
  }, [])

  return (
    <>
      <View style={styles.Navbar}>
        <Text style={{ color: "white", fontSize: 20 }}>Covid monitor</Text>
      </View>
      <ScrollView style={styles.container}>
        {notification.map((props, index) => (
          <Notification key={index + ""} {...props} />
        ))}
        <Status></Status>
        <Stat></Stat>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
  },
  Navbar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    backgroundColor: "#6c5ce7",
  },
})

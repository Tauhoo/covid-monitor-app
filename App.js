import React, { useState, useEffect } from "react"
import { StyleSheet, ScrollView } from "react-native"
import Notification from "./components/Notification"
import Status from "./components/Status"
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
    <ScrollView style={styles.container}>
      {notification.map((props, index) => (
        <Notification key={index + ""} {...props} />
      ))}
      <Status></Status>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe4ea",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
})

import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { queryNotification } from "./api"

export default function App() {
  useEffect(() => {
    async function fetchData() {
      const res = await queryNotification()
      console.log(res.data)
    }
    fetchData()
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

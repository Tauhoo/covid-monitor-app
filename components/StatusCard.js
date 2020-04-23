import React from "react"
import { View, Text, StyleSheet } from "react-native"

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    width: "50%",
  },
  wraper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#a29bfe",
    borderRadius: 10,
  },
})

export default ({ title, children }) => {
  return (
    <View style={style.container}>
      <View style={style.wraper}>
        <Text style={{ textAlign: "center" }}>{title}</Text>
        <Text style={{ marginVertical: 5, textAlign: "center" }}>
          {children}
        </Text>
      </View>
    </View>
  )
}

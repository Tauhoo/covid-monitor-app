import React from "react"
import { View, Text, StyleSheet } from "react-native"
import "moment/locale/th"
import moment from "moment"

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 8,
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#a4b0be",
    width: "100%",
  },
  contentContainer: {
    padding: 10,
  },
})

export default ({
  AnnounceBy,
  Date,
  Location,
  Province,
  Recommend,
  Update,
}) => {
  const timestamp = moment(Update).local("th").fromNow()

  return (
    <View style={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>
          ประกาศ
          <Text
            style={{
              color: "#2f3542",
              marginBottom: 2,
              marginLeft: 5,
              fontSize: 12,
            }}
          >
            {"  " + timestamp}
          </Text>
        </Text>
        <Text style={{ marginTop: 5 }}>{AnnounceBy}</Text>
      </View>
      <View style={style.contentContainer}>
        <Text>{Date}</Text>
        <Text style={{ marginTop: 10 }}>{Location}</Text>
        <Text>{Province}</Text>
        <Text style={{ marginTop: 20 }}>{Recommend}</Text>
      </View>
    </View>
  )
}

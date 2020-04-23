import React from "react"
import { View, Text, StyleSheet } from "react-native"
import "moment/locale/th"
import moment from "moment"

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 8,
    marginVertical: 5,
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#6c5ce7",
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
        <Text style={{ fontSize: 20, color: "white" }}>
          ประกาศ
          <Text
            style={{
              color: "#CCC",
              marginBottom: 2,
              marginLeft: 5,
              fontSize: 12,
            }}
          >
            {"  " + timestamp}
          </Text>
        </Text>
        <Text style={{ marginTop: 5, color: "white" }}>{AnnounceBy}</Text>
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

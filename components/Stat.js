import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { LineChart } from "react-native-chart-kit"
import SelectInput from "react-native-select-input-ios"
import { queryTimeline } from "../api"

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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
  },
  SelectorText: {
    fontSize: 20,
  },
  DisplayText: {
    fontSize: 18,
    textAlign: "center",
  },
  optionContainer: {
    backgroundColor: "#f1f2f6",
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },
})

const indexData = [
  "Confirmed",
  "Deaths",
  "Hospitalized",
  "NewConfirmed",
  "NewDeaths",
  "NewHospitalized",
  "NewRecovered",
  "Recovered",
]

const indexDataTH = [
  "ตรวจพบสะสม",
  "เสียชีวิต",
  "รับการรักษา",
  "ตรวจพบรายวัน",
  "เสียชีวิตรายวัน",
  "รับการรักษารายวัน",
  "หายรายวัน",
  "หายสะสม",
]

const convertor = (list, index) => {
  let labels = []
  let values = []
  let number = 0
  for (const data of list) {
    if (number % 3 === 0) {
      if (number % 4 === 0) {
        labels = [data.Date, ...labels]
      } else {
        labels = ["", ...labels]
      }
      values = [data[index], ...values]
    }
    number++
  }
  return { labels, values }
}

export default () => {
  const [index, setIndex] = useState("Confirmed")
  const [data, setData] = useState(null)

  async function fetchStatus() {
    const res = await queryTimeline()
    setData(res.data.Data)
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  if (data === null) return null

  const convertedData = convertor(data, index)

  return (
    <View style={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20, color: "white" }}>สถิติ</Text>
      </View>
      <SelectInput
        value={index}
        options={indexData.map((value, index) => ({
          value,
          label: indexDataTH[index],
        }))}
        cancelKeyText='ยกเลิก'
        submitKeyText='ตกลง'
        style={style.optionContainer}
        buttonsTextStyle={style.SelectorText}
        labelStyle={style.DisplayText}
        onValueChange={(value) => setIndex(value)}
      />
      <View>
        <ScrollView horizontal={true} style={{ borderRadius: 10 }}>
          <LineChart
            data={{
              labels: convertedData.labels,
              datasets: [
                {
                  data: convertedData.values,
                },
              ],
            }}
            width={convertedData.labels.length * 35} // from react-native
            height={350}
            yAxisSuffix=' คน'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={{
              backgroundColor: "#6c5ce7",
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          />
        </ScrollView>
      </View>
    </View>
  )
}

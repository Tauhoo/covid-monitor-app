import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Picker } from "react-native"
import { LineChart } from "react-native-chart-kit"
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
    backgroundColor: "#a4b0be",
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
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
  console.log("workk" + index)

  let labels = []
  let values = []
  let number = 0
  for (const data of list) {
    if (number % 2 === 0) {
      labels = [data.Date, ...labels]
      values = [data[index], ...values]
    }
  }
  return { labels, values }
}

export default () => {
  const [stat, setStat] = useState({ labels: [], values: [] })
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState("Confirmed")

  async function fetchStatus() {
    const res = await queryTimeline()
    const data = convertor(res.data.Data, index)
    console.log(1)

    setStat(data)
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [index])

  useEffect(() => {
    console.log(2)

    setLoading(false)
  }, [stat])

  if (loading || stat.values.length <= 0 || stat.labels.length <= 0) return null
  return (
    <View style={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>สถิติ</Text>
      </View>
      <Picker
        selectedValue={index}
        style={{ width: "100%" }}
        onValueChange={(value) => setIndex(value)}
      >
        {indexData.map((value, index) => (
          <Picker.Item
            label={indexDataTH[index]}
            key={value}
            value={indexData[index]}
          />
        ))}
      </Picker>
      <View style={{ width: "100%" }}>
        <ScrollView horizontal={true}>
          <LineChart
            data={{
              labels: stat.labels,
              datasets: [
                {
                  data: stat.values,
                },
              ],
            }}
            width={stat.labels.length * 25} // from react-native
            height={200}
            yAxisLabel='$'
            yAxisSuffix='k'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
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
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      </View>
    </View>
  )
}

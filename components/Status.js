import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { queryStateToday } from "../api"
import StatusCard from "./StatusCard"
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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
  },
})

export default () => {
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStatus() {
      const res = await queryStateToday()
      setStatus(res.data)
    }
    fetchStatus()
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [status])

  if (loading) return null

  const {
    Confirmed,
    Deaths,
    Hospitalized,
    NewConfirmed,
    NewDeaths,
    NewHospitalized,
    NewRecovered,
    Recovered,
    SeverBy,
    UpdateDate,
  } = status

  return (
    <View style={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20, color: "white" }}>สถานการณ์</Text>
      </View>
      <View style={style.contentContainer}>
        <StatusCard title='ตรวจพบสะสม'>{Confirmed}</StatusCard>
        <StatusCard title='ตรวจพบวันนี้'>{NewConfirmed}</StatusCard>
        <StatusCard title='เสียชีวิตสะสม'>{Deaths}</StatusCard>
        <StatusCard title='เสียชีวิตวันนี้'>{NewDeaths}</StatusCard>
        <StatusCard title='รับการรักษาสะสม'>{Hospitalized}</StatusCard>
        <StatusCard title='รับการรักษาวันนี้'>{NewHospitalized}</StatusCard>
        <StatusCard title='หายสะสม'>{Recovered}</StatusCard>
        <StatusCard title='หายวันนี้'>{NewRecovered}</StatusCard>
      </View>
    </View>
  )
}
